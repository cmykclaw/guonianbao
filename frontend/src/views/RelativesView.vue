<template>
  <div class="relatives-view">
    <van-nav-bar title="亲戚称呼速查" left-arrow @click-left="onBack" />

    <van-search
      v-model="searchText"
      placeholder="输入关系，如：老婆的爷爷的堂姐的孙女婿"
      @search="onSearch"
      clearable
    />

    <div v-if="searchText" class="search-results">
      <van-loading v-if="isAILoading" size="24px" class="ai-loading">
        关系太复杂，AI 正在飞速烧脑中...
      </van-loading>
      <template v-else>
        <van-cell-group v-if="searchResults.length > 0">
          <van-cell
            v-for="(item, index) in searchResults"
            :key="index"
            :title="item.relation"
            :value="item.title"
            value-class="title-highlight"
          />
        </van-cell-group>
        <van-cell-group v-else-if="calculatedResults.length > 0">
          <van-cell
            v-for="(item, index) in calculatedResults"
            :key="index"
            :title="item.relation"
            :value="item.title"
            value-class="title-highlight"
          />
        </van-cell-group>
        <van-empty
          v-else
          description="网络开小差了，不如直接叫帅哥美女吧！"
          image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        />
      </template>
    </div>

    <div v-else class="category-table">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="🤯 堂表迷阵 (同辈)" name="1">
          <van-cell v-for="(item, index) in group1" :key="index" :title="item.title" :label="item.relation" title-class="hardcore-title" />
        </van-collapse-item>
        <van-collapse-item title="👑 长辈配偶 (最怕叫错)" name="2">
          <van-cell v-for="(item, index) in group2" :key="index" :title="item.title" :label="item.relation" title-class="hardcore-title" />
        </van-collapse-item>
        <van-collapse-item title="🧧 混淆晚辈 (发红包必看)" name="3">
          <van-cell v-for="(item, index) in group3" :key="index" :title="item.title" :label="item.relation" title-class="hardcore-title" />
        </van-collapse-item>
        <van-collapse-item title="💍 婚后专属 (地狱级难度)" name="4">
          <van-cell v-for="(item, index) in group4" :key="index" :title="item.title" :label="item.relation" title-class="hardcore-title" />
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import relationship from 'relationship.js'

interface Relative {
  relation: string;
  title: string;
  category: '堂表迷阵' | '长辈配偶' | '复杂晚辈' | '婚后专属';
}

interface CalculationResult {
  relation: string
  title: string
}

const router = useRouter()
const searchText = ref('')
const activeNames = ref(['1'])
const isAILoading = ref(false)

function cleanInput(input: string): string {
  return input.trim().replace(/\s+/g, '').replace(/的+$/, '')
}

function calculateComplexRelation(inputStr: string): string[] {
  const cleaned = cleanInput(inputStr)
  if (!cleaned) return []

  const entities = cleaned.split('的')
  if (entities.length === 1) {
    const result = relationship({ text: cleaned })
    if (result) {
      return Array.isArray(result) ? result : [result]
    }
    return []
  }

  let currentRelation = entities[0]
  for (let i = 1; i < entities.length; i++) {
    const query = currentRelation + '的' + entities[i]
    try {
      const result = relationship({ text: query })
      if (result && result.length > 0) {
        const titles = Array.isArray(result) ? result : [result]
        currentRelation = titles[0]
      } else {
        return []
      }
    } catch {
      return []
    }
  }

  return [currentRelation]
}

async function callAIApi(relation: string): Promise<string | null> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/relatives/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ relation })
    })
    
    if (!response.ok) {
      throw new Error('API error')
    }
    
    const data = await response.json()
    return data.title || null
  } catch {
    return null
  }
}

const calculatedResults = ref<CalculationResult[]>([])

async function performCalculation() {
  const cleaned = cleanInput(searchText.value)
  if (!cleaned) {
    calculatedResults.value = []
    return
  }

  if (searchResults.value.length > 0) {
    calculatedResults.value = []
    return
  }

  try {
    const result = relationship({ text: cleaned })
    if (result && result.length > 0) {
      const titles = Array.isArray(result) ? result.join(' / ') : result
      calculatedResults.value = [{ relation: cleaned, title: titles }]
      return
    }
    
    if (cleaned.includes('的')) {
      const chainResult = calculateComplexRelation(cleaned)
      if (chainResult.length > 0) {
        calculatedResults.value = [{ relation: cleaned, title: chainResult.join(' / ') }]
        return
      }
    }
    
    isAILoading.value = true
    const aiTitle = await callAIApi(cleaned)
    if (aiTitle) {
      calculatedResults.value = [{ relation: cleaned, title: aiTitle }]
    } else {
      calculatedResults.value = []
    }
  } catch {
    isAILoading.value = true
    const aiTitle = await callAIApi(cleaned)
    if (aiTitle) {
      calculatedResults.value = [{ relation: cleaned, title: aiTitle }]
    } else {
      calculatedResults.value = []
    }
  } finally {
    isAILoading.value = false
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(searchText, () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  
  if (!searchText.value) {
    calculatedResults.value = []
    return
  }
  
  debounceTimer = setTimeout(() => {
    performCalculation()
  }, 500)
})

const relativesData: Relative[] = [
  { relation: '爸爸的兄弟的孩子', title: '堂哥 / 堂弟 / 堂姐 / 堂妹', category: '堂表迷阵' },
  { relation: '爸爸的姐妹的孩子', title: '表哥 / 表弟 / 表姐 / 表妹', category: '堂表迷阵' },
  { relation: '妈妈的兄弟的孩子', title: '表哥 / 表弟 / 表姐 / 表妹', category: '堂表迷阵' },
  { relation: '妈妈的姐妹的孩子', title: '表哥 / 表弟 / 表姐 / 表妹', category: '堂表迷阵' },
  { relation: '爸爸的姐妹的丈夫', title: '姑父', category: '长辈配偶' },
  { relation: '妈妈的兄弟的妻子', title: '舅妈', category: '长辈配偶' },
  { relation: '妈妈的姐妹的丈夫', title: '姨夫', category: '长辈配偶' },
  { relation: '爸爸的哥哥的妻子', title: '伯母 / 大妈', category: '长辈配偶' },
  { relation: '爸爸的弟弟的妻子', title: '婶婶', category: '长辈配偶' },
  { relation: '(男视角) 兄弟的孩子', title: '侄子 / 侄女', category: '复杂晚辈' },
  { relation: '妻子的姐妹的丈夫', title: '连襟', category: '婚后专属' },
  { relation: '丈夫的兄弟的妻子', title: '妯娌', category: '婚后专属' },
  { relation: '妻子的兄弟', title: '大舅哥 / 小舅子', category: '婚后专属' },
  { relation: '丈夫的姐妹', title: '大姑子 / 小姑子', category: '婚后专属' },
  { relation: '妻子的姐妹', title: '大姨子 / 小姨子', category: '婚后专属' }
]

const group1 = computed(() => relativesData.filter(item => item.category === '堂表迷阵'))
const group2 = computed(() => relativesData.filter(item => item.category === '长辈配偶'))
const group3 = computed(() => relativesData.filter(item => item.category === '复杂晚辈'))
const group4 = computed(() => relativesData.filter(item => item.category === '婚后专属'))

const searchResults = computed(() => {
  if (!searchText.value) return []
  const cleaned = cleanInput(searchText.value)
  if (!cleaned) return []
  const keyword = cleaned.toLowerCase()
  return relativesData.filter(item =>
    item.relation.toLowerCase().includes(keyword) ||
    item.title.toLowerCase().includes(keyword)
  )
})

const onSearch = () => {}

const onBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.relatives-view {
  min-height: 100vh;
  background-color: #f5f5f5;

  .search-results {
    padding: 16px;
  }

  .ai-loading {
    text-align: center;
    padding: 40px 0;
    color: #666;
    font-size: 14px;
  }

  .category-table {
    .van-tabs {
      background-color: #fff;
    }
  }

  :deep(.title-highlight) {
    font-weight: 600;
    color: #ee0a24;
  }

  :deep(.van-cell__value) {
    font-weight: 600;
    color: #ee0a24;
  }

  :deep(.van-empty) {
    padding: 60px 0;
  }

  :deep(.hardcore-title) {
    font-size: 16px;
    font-weight: bold;
    color: var(--van-primary-color);
  }
}
</style>

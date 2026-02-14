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
      <van-tabs v-model:active="activeTab" sticky>
        <van-tab title="爸爸这边的">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in fatherRelatives"
              :key="index"
              :title="item.relation"
              :value="item.title"
              value-class="title-highlight"
            />
          </van-cell-group>
        </van-tab>
        <van-tab title="妈妈这边的">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in motherRelatives"
              :key="index"
              :title="item.relation"
              :value="item.title"
              value-class="title-highlight"
            />
          </van-cell-group>
        </van-tab>
        <van-tab title="伴侣这边的">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in spouseRelatives"
              :key="index"
              :title="item.relation"
              :value="item.title"
              value-class="title-highlight"
            />
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import relationship from 'relationship.js'

interface Relative {
  relation: string
  title: string
  category: '父族' | '母族' | '伴侣族'
}

interface CalculationResult {
  relation: string
  title: string
}

const router = useRouter()
const searchText = ref('')
const activeTab = ref(0)
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
  { relation: '爷爷的堂姐的孙女婿', title: '表哥 / 表弟', category: '父族' },
  { relation: '爸爸的哥哥', title: '伯父 / 大爷', category: '父族' },
  { relation: '爸爸的弟弟', title: '叔叔', category: '父族' },
  { relation: '爸爸的姐姐', title: '姑姑 / 姑妈', category: '父族' },
  { relation: '爸爸的妹妹', title: '姑姑 / 姑妈', category: '父族' },
  { relation: '爷爷的堂姐', title: '堂姑祖母', category: '父族' },
  { relation: '爷爷的表弟', title: '姑表叔祖父 / 舅表叔祖父', category: '父族' },
  { relation: '爷爷的表姐', title: '姑表姑祖母 / 舅表姑祖母', category: '父族' },
  { relation: '奶奶的哥哥的儿子', title: '舅表伯父 / 舅表叔父', category: '父族' },
  { relation: '奶奶的姐姐', title: '姨奶奶', category: '父族' },
  { relation: '奶奶的姐姐的儿子', title: '姨伯父 / 姨叔父', category: '父族' },
  { relation: '妈妈的哥哥', title: '舅舅', category: '母族' },
  { relation: '妈妈的弟弟', title: '舅舅', category: '母族' },
  { relation: '妈妈的姐姐', title: '姨姨 / 姨妈', category: '母族' },
  { relation: '妈妈的妹妹', title: '姨姨 / 姨妈', category: '母族' },
  { relation: '外公的侄女', title: '堂姨', category: '母族' },
  { relation: '外婆的外甥女', title: '姑表姨母', category: '母族' },
  { relation: '表姐', title: '表姐 / 表妹', category: '母族' },
  { relation: '堂哥', title: '堂哥 / 堂弟', category: '母族' },
  { relation: '堂姐', title: '堂姐 / 堂妹', category: '母族' },
  { relation: '老婆的哥哥', title: '大舅子', category: '伴侣族' },
  { relation: '老婆的弟弟', title: '小舅子', category: '伴侣族' },
  { relation: '老婆的姐姐', title: '大姨子', category: '伴侣族' },
  { relation: '老婆的妹妹', title: '小姨子', category: '伴侣族' },
  { relation: '老公的哥哥', title: '大伯子', category: '伴侣族' },
  { relation: '老公的弟弟', title: '小叔子', category: '伴侣族' },
  { relation: '老公的姐姐', title: '大姑子', category: '伴侣族' },
  { relation: '老公的妹妹', title: '小姑子', category: '伴侣族' },
]

const fatherRelatives = computed(() =>
  relativesData.filter(item => item.category === '父族')
)

const motherRelatives = computed(() =>
  relativesData.filter(item => item.category === '母族')
)

const spouseRelatives = computed(() =>
  relativesData.filter(item => item.category === '伴侣族')
)

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
}
</style>

<template>
  <div class="tips-view">
    <van-nav-bar title="锦囊" left-arrow @click-left="onBack" />

    <van-tabs v-model:active="activeTab" sticky>
      <van-tab title="定制吉祥话">
        <div class="tab-content">
          <div class="ai-section">
            <van-field
              v-model="userContext"
              type="textarea"
              placeholder="你想给谁拜年？有什么特征？(例如：爱炒股的二舅)"
              rows="2"
              autosize
            />
            <van-button
              type="primary"
              block
              :loading="isGenerating"
              @click="generateGreeting"
            >
              ✨ AI 定制
            </van-button>
          </div>

          <van-loading v-if="isGenerating" size="24px" class="loading">
            AI 正在生成中...
          </van-loading>

          <div v-else-if="activeTab === 0 && aiResults.length > 0" class="results-section">
            <div class="section-title">AI 为您定制</div>
            <van-cell-group>
              <van-cell
                v-for="(item, index) in aiResults"
                :key="index"
                :title="item"
              >
                <template #right-icon>
                  <van-icon name="copy-o" @click="copyText(item)" />
                </template>
              </van-cell>
            </van-cell-group>
          </div>

          <div class="static-section">
            <van-collapse v-model="activeCollapse">
              <van-collapse-item title="常用经典语录" name="greeting">
                <van-cell-group>
                  <van-cell
                    v-for="(item, index) in staticGreetings"
                    :key="index"
                    :title="item"
                  >
                    <template #right-icon>
                      <van-icon name="copy-o" @click="copyText(item)" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
      </van-tab>

      <van-tab title="高情商防身">
        <div class="tab-content">
          <div class="ai-section">
            <van-field
              v-model="userContext"
              type="textarea"
              placeholder="亲戚刚才问了啥尴尬问题？"
              rows="2"
              autosize
            />
            <van-button
              type="warning"
              block
              :loading="isGenerating"
              @click="generateComeback"
            >
              🆘 呼叫军师
            </van-button>
          </div>

          <van-loading v-if="isGenerating" size="24px" class="loading">
            AI 正在生成中...
          </van-loading>

          <div v-else-if="activeTab === 1 && aiResults.length > 0" class="results-section">
            <div class="section-title">军师建议</div>
            <van-cell-group>
              <van-cell
                v-for="(item, index) in aiResults"
                :key="index"
                :title="item"
              >
                <template #right-icon>
                  <van-icon name="copy-o" @click="copyText(item)" />
                </template>
              </van-cell>
            </van-cell-group>
          </div>

          <div class="static-section">
            <van-collapse v-model="activeCollapse">
              <van-collapse-item title="常用经典语录" name="comeback">
                <van-cell-group>
                  <van-cell
                    v-for="(item, index) in staticComebacks"
                    :key="index"
                    :title="item"
                  >
                    <template #right-icon>
                      <van-icon name="copy-o" @click="copyText(item)" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const activeTab = ref(0)
const userContext = ref('')
const isGenerating = ref(false)
const aiResults = ref<string[]>([])
const activeCollapse = ref<string[]>([])

const staticGreetings = [
  '祝您新春快乐，恭喜发财，健康长寿，笑口常开！',
  '给您拜年啦！愿您新年新气象，岁岁平安吉祥！',
  '新年到，祝福到！祝您和家幸福美满，万事如意！',
  '拜年啦！祝您新的一年里心想事成，阖家欢乐！',
  '新春佳节到，祝您福气满满当当，生活蒸蒸日上！',
  '给您拜年！愿您新的一年里万事亨通，财源广进！',
  '新年好！祝您岁岁年年今朝在，欢欢喜喜迎新春！',
  '拜个早年！祝您新春大吉，吉祥如意！',
]

const staticComebacks: string[] = [
  '我还年轻，先以事业为重，谢谢关心！',
  '我现在还在学习，等毕业了再考虑这些事。',
  '叔叔阿姨说得对，我一定好好努力！',
  '来来来，先吃菜，这菜做得真香！',
  '我最近在健身自律，等过完年再说！',
  '哎呀，咱们聊点开心的吧，比如您家孩子学习怎么样？',
  '我的眼光可高了，一般人可入不了眼！',
  '新时代新思想，我现在追求的是自我提升！',
]

async function generateGreeting() {
  if (!userContext.value.trim()) {
    showToast('请输入祝福对象特征')
    return
  }
  await generateAI('greeting')
}

async function generateComeback() {
  if (!userContext.value.trim()) {
    showToast('请输入亲戚问的问题')
    return
  }
  await generateAI('comeback')
}

async function generateAI(type: 'greeting' | 'comeback') {
  isGenerating.value = true
  aiResults.value = []
  
  try {
    const response = await fetch('http://localhost:3000/api/tips/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type,
        context: userContext.value
      })
    })
    
    if (!response.ok) {
      throw new Error('API error')
    }
    
    const data = await response.json()
    if (data.results && Array.isArray(data.results)) {
      aiResults.value = data.results
    }
  } catch (error) {
    console.error('AI generation error:', error)
    showToast('生成失败，请检查网络或稍后重试')
  } finally {
    isGenerating.value = false
  }
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    showToast('复制成功')
  } catch {
    showToast('复制失败')
  }
}

function onBack() {
  router.back()
}
</script>

<style scoped lang="scss">
.tips-view {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 50px;
}

.tab-content {
  padding: 16px;
}

.ai-section {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  .van-field {
    margin-bottom: 12px;
  }
}

.loading {
  text-align: center;
  padding: 20px 0;
  color: #666;
}

.results-section {
  margin-bottom: 16px;

  .section-title {
    font-size: 14px;
    color: #1989fa;
    font-weight: 600;
    margin-bottom: 8px;
    padding-left: 4px;
    border-left: 3px solid #1989fa;
  }

  .van-cell {
    align-items: center;
  }

  .van-icon {
    font-size: 18px;
    color: #1989fa;
    padding: 4px;
  }
}

.static-section {
  .section-title {
    font-size: 14px;
    color: #666;
    font-weight: 600;
    margin-bottom: 8px;
    padding-left: 4px;
    border-left: 3px solid #ff976a;
  }

  .van-cell {
    align-items: center;
    font-size: 14px;
  }

  .van-icon {
    font-size: 18px;
    color: #ff976a;
    padding: 4px;
  }
}
</style>

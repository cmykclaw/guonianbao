# Spec: gift-record-model

## ADDED Requirements

### Requirement: Prisma 模型定义
数据库必须包含 GiftRecord 模型，用于存储礼薄记录。

#### Scenario: 模型字段完整性
- **WHEN** 查看 `prisma/schema.prisma`
- **THEN** 必须存在 GiftRecord 模型
- **AND** 必须包含以下字段：
  - `id`: String, UUID, 主键, 自动生成
  - `name`: String, 非空
  - `type`: String, 非空（'RECEIVED' 或 'GIVEN'）
  - `amount`: Float, 非空
  - `date`: DateTime, 默认当前时间
  - `notes`: String?, 可选
  - `createdAt`: DateTime, 默认当前时间
  - `updatedAt`: DateTime, 自动更新

#### Scenario: 数据库迁移
- **WHEN** 运行 `prisma migrate dev`
- **THEN** 必须成功创建 gift_records 表
- **AND** 表结构必须与模型定义一致

### Requirement: 共享类型定义
必须在 shared 包中定义 GiftRecord 相关的 TypeScript 类型。

#### Scenario: DTO 类型定义
- **WHEN** 查看 `shared/src/types/index.ts`
- **THEN** 必须包含 GiftRecordDTO 接口
- **AND** 必须包含 CreateGiftRecordRequest 接口
- **AND** 类型定义必须与 Prisma 模型一致

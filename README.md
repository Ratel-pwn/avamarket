# AvaMarket API & Schema

## SQL Schema

```sql
-- 场景表
CREATE TABLE scene (
  id UUID PRIMARY KEY,                -- 场景唯一ID
  title VARCHAR(255),                 -- 标题
  main_label VARCHAR(64),             -- 主标签
  labels UUID[],                      -- 标签（标签ID数组）
  type_id JSONB,                      -- 类型ID { "dify": "...", "n8n": "..." }
  clicks INT,                         -- 点击次数
  downloads INT,                      -- 下载总数
  status INT,                         -- 发布状态（0编辑,1申请发布,2已发布,3隐藏,4删除）
  created_at TIMESTAMP,               -- 创建时间
  created_by UUID,                    -- 创建人ID
  updated_at TIMESTAMP,               -- 更新时间
  updated_by UUID                     -- 更新人ID
);

-- 场景详细信息表
CREATE TABLE scene_detail (
  scene_id UUID PRIMARY KEY,          -- 场景唯一ID
  detail_id UUID,                     -- 详细信息ID
  svg_url TEXT,                       -- 矢量图URL, 可以为null, 前端需增加一种null状态的渲染风格
  dsl_url TEXT,                       -- DSL下载路径
  downloads INT,                      -- 下载次数
  readme_url TEXT,                    -- 简介(MD url)
  type VARCHAR(32),                   -- 类型（dify、n8n、coze、a1）
  created_at TIMESTAMP,               -- 创建时间
  created_by UUID,                    -- 创建人ID
  updated_at TIMESTAMP,               -- 更新时间
  updated_by UUID                     -- 更新人ID
);

-- 用户信息表
CREATE TABLE user_info (
  id UUID PRIMARY KEY,                -- 用户ID
  email VARCHAR(255) UNIQUE,          -- 邮箱
  password VARCHAR(255),              -- 密码（加密）
  account_type VARCHAR(32),           -- 账号类型（自注册、Google、Apple、Github）采用Auth0 方案
  name VARCHAR(64),               -- 昵称
  avatar TEXT,                        -- 头像URL
  is_verified BOOLEAN,                -- 是否认证
  is_official BOOLEAN,                -- 是否官方
  permission VARCHAR(32),             -- 权限
  bio TEXT,                           -- 个人简介
  created_at DATE                     -- 注册时间
);

-- 用户文档表
CREATE TABLE user_doc (
  user_id UUID,                       -- 用户ID
  scene_id UUID                       -- 场景唯一ID
);

-- 标签表
CREATE TABLE tag (
  id UUID PRIMARY KEY,                -- 标签ID
  name VARCHAR(64),                   -- 标签名
  level INT,                          -- 标签等级（0一级，1二级，10自定标签）
  status INT                          -- 标签状态（0编辑,1申请发布,2已发布,3隐藏,4删除）
);
```

## API Specification

```http
POST /api/scene/list
Content-Type: application/json

{
  "labels": ["标签ID"],      // 标签筛选
  "string": "标题关键字",     // 标题模糊搜索
  "count": 10,               // 每页数量
  "page": 1,                 // 页码
  "user_email": "xxx@xx.com" // 用户邮箱,optional, 用于渲染 user > my posts
}
```
> ### 返回场景Summary Search接口
> 场景列表（含id、title、labels、downloads、author、数量、总数量、当前页数、总页数等）  


```http
GET /api/scene/detail?sceneId={id}&userEmail={email}

// 根据email判断当前用户是否可以编辑这个场景
```
> ### 返回场景详情接口 
> ```
> {
>   "templates": [
>     {
>       "id": "template-1",
>       "title": "模板标题",
>       "author": { "name": "作者名", "user_email": "作者邮箱", "avatar": "头像URL", "isVerified": true, "isOfficial": false },
>       "downloads": 2345,
>       "category": "AI",
>       "subcategory": "Featured AI templates",
>       "labels": ["标签1", "标签2"],
>       "dslFiles": [
>         { "platformName": "Dify", "fileUrl": "Dify平台DSL文件URL", "svgPreview": "Dify平台SVG预览图URL" },
>         { "platformName": "n8n", "fileUrl": "n8n平台DSL文件URL", "svgPreview": "n8n平台SVG预览图URL" }
>       ],
>       "readme": "Markdown内容"
>     }
>   ]
> }
> ```


```http
GET /api/user/info
Authorization: Bearer <token>
```
> // 用户信息展示接口

```http
POST /api/user/edit
Authorization: Bearer <token>
Content-Type: application/json

{
  // 用户信息字段
}
```
> // 用户信息编辑接口

```http
POST /api/user/doc
Authorization: Bearer <token>
Content-Type: application/json

{
  "user_id": "xxx",
  "scene_id": "xxx"
}
```
> // 文档编写接口

```http
POST /api/user/doc/review
Authorization: Bearer <token>
Content-Type: application/json

{
  // 审查内容
}
```
> // 文档审查接口

```http
GET /api/tag/list
```
> // 标签表接口

```http
PATCH /api/user/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "新昵称",         // 可选，字符串
  "avatar": (file),            // 可选，图片文件
  "bio": "新的个人简介"         // 可选，字符串
}
```
> // 用户资料编辑接口，仅允许修改昵称、头像（图片上传）、个人简介。邮箱、密码、认证等字段不可修改。
> // 返回：更新后的用户信息对象

---

# **AvaMarket - Dify场景市场**

## **系统概述**

AvaMarket 是一个专门为 Dify 平台打造的场景市场，专注于 Dify 工作流场景、应用模板和插件的展示与分发。系统采用 React + Vite 技术栈，具备响应式设计和现代化的用户界面，为 Dify 用户提供丰富的场景资源。

## **核心功能特性**

### **1. 智能分类系统**
- **7个主要分类**: AI、Sales、IT Ops、Marketing、Document Ops、Other、Support
- **多级分类结构**: 每个主分类下包含多个二级分类，支持精确的内容组织
- **动态内容展示**: 每个二级分类最多显示6个精选内容，支持"explore more"扩展查看

### **2. 内容类型支持**
- **Dify Workflow**: Dify 工作流场景模板
- **Dify App**: Dify 应用模板
- **Dify Plugin**: Dify 插件和扩展

### **3. 高级搜索与筛选**
- **实时搜索**: 支持标题、标签的实时搜索
- **分类筛选**: 点击分类标签快速筛选内容
- **结果页面**: 搜索结果页面支持排序和完整列表展示

## **页面结构与功能**

### **1. 主页 (HomePage)**
- **分类导航**: 顶部显示7个主要分类，支持切换
- **分区展示**: 每个二级分类独立区块，包含标题、内容卡片、explore more链接
- **内容卡片**: 3列×2行网格布局，展示模板/平台的核心信息
- **搜索集成**: 顶部搜索栏，支持关键词搜索和分类筛选

### **2. 内容详情页 (DetailPage)**
- **两栏布局**: 左栏(1/3)显示元数据，右栏(2/3)显示预览和文档
- **Dify场景预览**: 专门针对Dify工作流的可视化预览
- **SVG预览窗口**: 可交互的SVG预览，支持拖拽和缩放
- **Markdown渲染**: 完整的README文档渲染，支持下载和代码/渲染视图切换
- **元数据展示**: 作者信息、认证徽章、更新时间、下载量、分类信息

### **3. 内容发布页 (PublishPage)**
- **类型选择**: 支持Dify Workflow、Dify App、Dify Plugin三种类型
- **动态表单**: 根据类型动态显示对应表单字段
- **Dify文件管理**: 支持Dify工作流文件、应用配置和插件文件的上传管理
- **README编辑器**: 支持 Markdown 格式内容编辑，并支持本地 .md 文件上传自动填充

## **用户界面组件**

### **1. 顶部导航栏 (Header)**
- **品牌标识**: AvaMarket Logo和品牌名称
- **主导航**: Workflows、Apps、Plugins三个主要分类
- **操作按钮**: Publish按钮（带发光效果）
- **用户中心**: 头像下拉菜单，包含Profile、My Posts、Logout

### **2. 内容卡片 (ContentCard)**
- **信息展示**: 标题、作者、认证徽章、下载量、标签
- **交互功能**: 点击进入详情页
- **视觉设计**: 现代化卡片设计，支持悬停效果

### **3. 分类筛选器 (CategoryFilter)**
- **分类标签**: 支持主分类和二级分类的快速切换
- **视觉反馈**: 选中状态的高亮显示
- **响应式设计**: 适配不同屏幕尺寸

## **技术架构**

### **前端技术栈**
- **框架**: React 18
- **构建工具**: Vite
- **样式系统**: Tailwind CSS + 自定义CSS变量
- **图标库**: Lucide React
- **Markdown渲染**: @uiw/react-markdown-preview

### **目录结构建议（补充）**
- `src/pages/ProfilePage.jsx`：用户中心页面
- `src/store/slices/userSlice.js`：用户信息相关 Redux slice

### **组件通信与数据流规范（补充）**
- ProfilePage 通过 Redux 获取和更新用户信息，所有编辑操作（含头像上传）均通过 dispatch 异步 action 实现
- 头像上传建议用 form-data 方式，上传成功后自动更新 Redux 中的用户信息

---

## **文件说明（src/ 目录主要文件）**

- `src/App.jsx`：应用主入口，路由和全局布局
- `src/main.jsx`：React 应用挂载入口，注入 Provider、Router 等
- `src/pages/`：页面组件目录
  - `HomePage.jsx`：首页，内容卡片、分类、搜索、无限滚动
  - `DetailPage.jsx`：内容详情页，展示模板/平台详细信息
  - `PublishPage.jsx`：内容发布页，表单、DSL上传、README编辑
  - `ProfilePage.jsx`：用户中心页，资料展示与编辑
- `src/components/`：复用 UI 组件
  - `Header.jsx`：顶部导航栏
  - `Footer.jsx`：底部信息栏
  - `ContentCard.jsx`：内容卡片
  - `CategoryFilter.jsx`：分类筛选器
  - `BentoGrid.jsx`：首页 Bento 风格背景
  - 其它 UI 组件
- `src/store/`：Redux 全局状态管理
  - `index.js`：store 配置
  - `slices/contentSlice.js`：内容分页、加载、筛选
  - `slices/userSlice.js`：用户信息、登录、编辑
- `src/data/`：模拟数据和配置
  - `mockData.js`：mock 场景、标签、用户等数据
  - `mockReadme.md`：示例 README 文本
- `src/utils/`：工具函数和 API 封装
  - `api.js`：所有后端/Mock API 请求封装
- `src/assets/`：静态资源（图片、SVG、平台图标等）
- `src/index.css`、`src/fonts.css`：全局样式、字体

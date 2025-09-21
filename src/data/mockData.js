// 模拟数据
import mockReadme from './mockReadme.md?raw';
export const categories = {
  "AI": {
    name: "AI",
    subcategories: [
      { id: "ai-featured", name: "Featured AI templates", description: "精选AI模板", icon: "🤖" },
      { id: "ai-chatbot", name: "AI Chatbot", description: "AI聊天机器人", icon: "💬" },
      { id: "ai-rag", name: "AI RAG", description: "AI检索增强生成", icon: "🔍" },
      { id: "ai-summarization", name: "AI Summarization", description: "AI摘要生成", icon: "📝" },
      { id: "ai-multimodal", name: "Multimodal AI", description: "多模态AI", icon: "🎨" }
    ]
  },
  "Sales": {
    name: "Sales",
    subcategories: [
      { id: "sales-crm", name: "CRM Integration", description: "客户关系管理集成", icon: "👥" },
      { id: "sales-automation", name: "Sales Automation", description: "销售自动化", icon: "⚡" }
    ]
  },
  "IT Ops": {
    name: "IT Ops",
    subcategories: [
      { id: "it-monitoring", name: "System Monitoring", description: "系统监控", icon: "📊" },
      { id: "it-deployment", name: "Deployment", description: "部署管理", icon: "🚀" }
    ]
  },
  "Marketing": {
    name: "Marketing",
    subcategories: [
      { id: "marketing-social", name: "Social Media", description: "社交媒体营销", icon: "📱" },
      { id: "marketing-email", name: "Email Marketing", description: "邮件营销", icon: "📧" }
    ]
  },
  "Document Ops": {
    name: "Document Ops",
    subcategories: [
      { id: "doc-automation", name: "Document Automation", description: "文档自动化", icon: "📄" },
      { id: "doc-collaboration", name: "Collaboration", description: "协作工具", icon: "🤝" }
    ]
  },
  "Other": {
    name: "Other",
    subcategories: [
      { id: "other-utilities", name: "Utilities", description: "实用工具", icon: "🔧" }
    ]
  },
  "Support": {
    name: "Support",
    subcategories: [
      { id: "support-ticket", name: "Ticket System", description: "工单系统", icon: "🎫" }
    ]
  }
};

export const techLabels = [
  "Google Sheets", "Feishu/Lark", "OpenAI", "Telegram", "Gmail", 
  "MySQL", "Postgres", "Discord", "Google Drive", "Slack", 
  "Notion", "Microsoft Outlook", "Microsoft Excel 365", 
  "Google Calendar", "AWS Bedrock Chat Model", "AWS Certificate Manager"
];

export const templates = [
  // Featured AI templates
  {
    id: "template-1",
    title: "Angie, Personal AI Assistant with Telegram Voice and Text",
    author: { name: "Alice", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Alice", isVerified: true, isOfficial: false },
    downloads: 2345,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["Telegram", "OpenAI", "Feishu","Lark","WeCom","Wechat","X"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "你的专属AI助理，支持语音与文本交互",
    lastUpdate: "1 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: mockReadme
  },
  {
    id: "template-2",
    title: "Chat with local LLMs using Dify and Ollama",
    author: { name: "Bob", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Bob", isVerified: false, isOfficial: false },
    downloads: 1987,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["Dify", "Ollama", "OpenAI"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "本地大模型聊天机器人，支持Dify与Ollama",
    lastUpdate: "3 days ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Chat with local LLMs\n\n- 本地部署\n- 支持Ollama\n- Dify集成"
  },
  {
    id: "template-3",
    title: "Chat with a database using AI",
    author: { name: "Carol", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Carol", isVerified: true, isOfficial: true },
    downloads: 1560,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["MySQL", "Postgres", "OpenAI"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "用AI自然语言查询数据库",
    lastUpdate: "5 days ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Chat with DB\n\n- 支持MySQL/Postgres\n- 自然语言查询\n- AI分析"
  },
  {
    id: "template-4",
    title: "RAG Chatbot for Company Documents using Google Drive and Gemini",
    author: { name: "David", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=David", isVerified: false, isOfficial: false },
    downloads: 1420,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["Google Drive", "Gemini", "OpenAI"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "企业文档RAG智能问答机器人",
    lastUpdate: "1 month ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# RAG Chatbot\n\n- Google Drive文档\n- Gemini模型\n- 企业知识库"
  },
  {
    id: "template-5",
    title: "Basic Automatic Gmail Email Labelling with OpenAI and Gmail API",
    author: { name: "Eve", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Eve", isVerified: false, isOfficial: false },
    downloads: 1200,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["Gmail", "OpenAI"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "自动邮件标签分类，提升效率",
    lastUpdate: "2 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Gmail Labelling\n\n- 自动标签\n- OpenAI分类\n- Gmail API"
  },
  {
    id: "template-6",
    title: "Analyze Landing Page with OpenAI and Get Optimization Tips",
    author: { name: "Frank", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Frank", isVerified: true, isOfficial: false },
    downloads: 1100,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["OpenAI", "Google Sheets"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "分析落地页并给出优化建议",
    lastUpdate: "3 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Landing Page Analysis\n\n- OpenAI分析\n- 优化建议\n- Google Sheets"
  },

  // AI Chatbot
  {
    id: "template-7",
    title: "Enterprise Chatbot for Internal Q&A",
    author: { name: "Grace", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Grace", isVerified: true, isOfficial: true },
    downloads: 2100,
    category: "AI",
    subcategory: "AI Chatbot",
    labels: ["OpenAI", "Slack", "Notion"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "企业内部知识库问答机器人",
    lastUpdate: "1 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Enterprise Chatbot\n\n- 内部知识库\n- Slack集成\n- Notion同步"
  },
  {
    id: "template-8",
    title: "Customer Support Chatbot with Feishu",
    author: { name: "Henry", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Henry", isVerified: false, isOfficial: false },
    downloads: 1800,
    category: "AI",
    subcategory: "AI Chatbot",
    labels: ["Feishu/Lark", "OpenAI"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "飞书客服机器人，自动回复常见问题",
    lastUpdate: "2 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Feishu Chatbot\n\n- 飞书客服\n- OpenAI问答"
  },
  {
    id: "template-9",
    title: "Discord Community AI Chatbot",
    author: { name: "Ivy", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Ivy", isVerified: false, isOfficial: false },
    downloads: 1700,
    category: "AI",
    subcategory: "AI Chatbot",
    labels: ["Discord", "OpenAI"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "Discord社区AI聊天机器人",
    lastUpdate: "3 days ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Discord Chatbot\n\n- Discord集成\n- AI聊天"
  },
  {
    id: "template-10",
    title: "Multi-language Chatbot for Global Teams",
    author: { name: "Jack", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Jack", isVerified: true, isOfficial: false },
    downloads: 1600,
    category: "AI",
    subcategory: "AI Chatbot",
    labels: ["OpenAI", "Google Sheets"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "多语言支持的全球团队聊天机器人",
    lastUpdate: "1 month ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Multi-language Chatbot\n\n- 多语言\n- Google Sheets"
  },
  {
    id: "template-11",
    title: "AI FAQ Bot for Websites",
    author: { name: "Kate", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Kate", isVerified: false, isOfficial: false },
    downloads: 1500,
    category: "AI",
    subcategory: "AI Chatbot",
    labels: ["OpenAI", "Telegram"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "网站常见问题AI机器人",
    lastUpdate: "2 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# FAQ Bot\n\n- 网站FAQ\n- Telegram集成"
  },
  {
    id: "template-12",
    title: "AI Customer Service Bot",
    author: { name: "John Doe", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=JohnDoe", isVerified: true, isOfficial: false },
    downloads: 1247,
    category: "AI",
    subcategory: "AI Chatbot",
    labels: ["OpenAI", "Discord", "Google Sheets"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "智能客服机器人，支持多平台集成",
    lastUpdate: "2 months ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# AI Customer Service Bot\n\n## 功能特性\n- 智能问答\n- 多平台支持\n- 自动学习\n\n## 使用方法\n1. 下载DSL文件\n2. 导入到对应平台\n3. 配置API密钥"
  },

  // AI RAG
  {
    id: "template-13",
    title: "RAG for Legal Document Search",
    author: { name: "Leo", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Leo", isVerified: true, isOfficial: false },
    downloads: 1400,
    category: "AI",
    subcategory: "AI RAG",
    labels: ["OpenAI", "Google Drive"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "法律文档智能检索与问答",
    lastUpdate: "1 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Legal RAG\n\n- 法律文档\n- 智能检索"
  },
  {
    id: "template-14",
    title: "RAG Chatbot for HR Policies",
    author: { name: "Mona", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Mona", isVerified: false, isOfficial: false },
    downloads: 1300,
    category: "AI",
    subcategory: "AI RAG",
    labels: ["OpenAI", "Notion"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "HR政策RAG问答机器人",
    lastUpdate: "2 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# HR RAG\n\n- HR政策\n- Notion知识库"
  },
  {
    id: "template-15",
    title: "RAG for Product Manuals",
    author: { name: "Nina", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Nina", isVerified: false, isOfficial: false },
    downloads: 1200,
    category: "AI",
    subcategory: "AI RAG",
    labels: ["OpenAI", "Google Drive"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "产品手册RAG智能问答",
    lastUpdate: "3 days ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Product Manual RAG\n\n- 产品手册\n- Google Drive"
  },
  {
    id: "template-16",
    title: "RAG for Academic Papers",
    author: { name: "Oscar", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Oscar", isVerified: true, isOfficial: false },
    downloads: 1100,
    category: "AI",
    subcategory: "AI RAG",
    labels: ["OpenAI", "Google Drive"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "学术论文RAG检索",
    lastUpdate: "1 month ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Academic RAG\n\n- 学术论文\n- Google Drive"
  },
  {
    id: "template-17",
    title: "RAG for Company Policies",
    author: { name: "Paul", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Paul", isVerified: false, isOfficial: false },
    downloads: 1000,
    category: "AI",
    subcategory: "AI RAG",
    labels: ["OpenAI", "Notion"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "公司政策RAG问答",
    lastUpdate: "2 months ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Company Policy RAG\n\n- 公司政策\n- Notion"
  },
  {
    id: "template-18",
    title: "RAG for Marketing Materials",
    author: { name: "Quinn", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Quinn", isVerified: false, isOfficial: false },
    downloads: 900,
    category: "AI",
    subcategory: "AI RAG",
    labels: ["OpenAI", "Google Drive"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "营销资料RAG问答",
    lastUpdate: "3 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Marketing RAG\n\n- 营销资料\n- Google Drive"
  },

  // AI Summarization
  {
    id: "template-19",
    title: "Meeting Minutes Summarizer",
    author: { name: "Rose", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Rose", isVerified: true, isOfficial: false },
    downloads: 1800,
    category: "AI",
    subcategory: "AI Summarization",
    labels: ["OpenAI", "Google Sheets"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "会议纪要自动摘要",
    lastUpdate: "1 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Meeting Summarizer\n\n- 会议纪要\n- 自动摘要"
  },
  {
    id: "template-20",
    title: "Email Thread Summarizer",
    author: { name: "Sam", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Sam", isVerified: false, isOfficial: false },
    downloads: 1700,
    category: "AI",
    subcategory: "AI Summarization",
    labels: ["OpenAI", "Gmail"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "邮件对话自动摘要",
    lastUpdate: "2 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Email Summarizer\n\n- 邮件摘要\n- Gmail集成"
  },
  {
    id: "template-21",
    title: "Document Summarizer for Google Drive",
    author: { name: "Tina", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Tina", isVerified: false, isOfficial: false },
    downloads: 1600,
    category: "AI",
    subcategory: "AI Summarization",
    labels: ["OpenAI", "Google Drive"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "Google Drive文档摘要",
    lastUpdate: "3 days ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Doc Summarizer\n\n- Google Drive\n- 文档摘要"
  },
  {
    id: "template-22",
    title: "Slack Channel Summarizer",
    author: { name: "Uma", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Uma", isVerified: true, isOfficial: false },
    downloads: 1500,
    category: "AI",
    subcategory: "AI Summarization",
    labels: ["OpenAI", "Slack"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "Slack频道消息摘要",
    lastUpdate: "1 month ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Slack Summarizer\n\n- Slack频道\n- 消息摘要"
  },
  {
    id: "template-23",
    title: "YouTube Video Summarizer",
    author: { name: "Victor", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Victor", isVerified: false, isOfficial: false },
    downloads: 1400,
    category: "AI",
    subcategory: "AI Summarization",
    labels: ["OpenAI", "Google Sheets"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "YouTube视频自动摘要",
    lastUpdate: "2 months ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# YouTube Summarizer\n\n- 视频摘要\n- Google Sheets"
  },
  {
    id: "template-24",
    title: "PDF Summarizer",
    author: { name: "Wendy", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Wendy", isVerified: false, isOfficial: false },
    downloads: 1300,
    category: "AI",
    subcategory: "AI Summarization",
    labels: ["OpenAI", "Google Drive"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "PDF文档自动摘要",
    lastUpdate: "3 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# PDF Summarizer\n\n- PDF摘要\n- Google Drive"
  },

  // Multimodal AI
  {
    id: "template-25",
    title: "Image Captioning with Gemini",
    author: { name: "Xander", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Xander", isVerified: true, isOfficial: false },
    downloads: 1700,
    category: "AI",
    subcategory: "Multimodal AI",
    labels: ["Gemini", "OpenAI"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "图片自动生成描述",
    lastUpdate: "1 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Image Captioning\n\n- 图片描述\n- Gemini模型"
  },
  {
    id: "template-26",
    title: "Audio Transcription with OpenAI Whisper",
    author: { name: "Yara", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Yara", isVerified: false, isOfficial: false },
    downloads: 1600,
    category: "AI",
    subcategory: "Multimodal AI",
    labels: ["OpenAI", "Whisper"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "音频转文字，支持多语言",
    lastUpdate: "2 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Audio Transcription\n\n- 音频转文字\n- Whisper"
  },
  {
    id: "template-27",
    title: "Video Scene Detection",
    author: { name: "Zack", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Zack", isVerified: false, isOfficial: false },
    downloads: 1500,
    category: "AI",
    subcategory: "Multimodal AI",
    labels: ["OpenAI", "Google Drive"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "视频场景自动检测",
    lastUpdate: "3 days ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Video Scene Detection\n\n- 视频场景\n- OpenAI"
  },
  {
    id: "template-28",
    title: "OCR Document Processing",
    author: { name: "Amy", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Amy", isVerified: true, isOfficial: false },
    downloads: 1400,
    category: "AI",
    subcategory: "Multimodal AI",
    labels: ["OpenAI", "Google Drive"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "OCR文档处理与分析",
    lastUpdate: "1 month ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# OCR Processing\n\n- OCR识别\n- 文档分析"
  },
  {
    id: "template-29",
    title: "Multimodal Sentiment Analysis",
    author: { name: "Ben", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Ben", isVerified: false, isOfficial: false },
    downloads: 1300,
    category: "AI",
    subcategory: "Multimodal AI",
    labels: ["OpenAI", "Gemini"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "多模态情感分析",
    lastUpdate: "2 months ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Sentiment Analysis\n\n- 多模态\n- 情感分析"
  },
  {
    id: "template-30",
    title: "Image-to-Text for Accessibility",
    author: { name: "Cathy", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Cathy", isVerified: false, isOfficial: false },
    downloads: 1200,
    category: "AI",
    subcategory: "Multimodal AI",
    labels: ["OpenAI", "Google Sheets"],
    svgPreview: "https://via.placeholder.com/300x200",
    description: "无障碍图片转文本",
    lastUpdate: "3 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Image-to-Text\n\n- 无障碍\n- 图片转文本"
  }
];

export const platforms = [
  {
    id: "platform-1",
    title: "Dify AI Platform",
    author: { name: "Dify Team", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=DifyTeam", isVerified: true, isOfficial: true },
    downloads: 5678,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["OpenAI", "Google Drive", "Slack"],
    projectUrl: "https://dify.ai",
    description: "开源的LLMOps平台",
    lastUpdate: "1 week ago",
    readme: "# Dify AI Platform\n\n## 平台特性\n- 可视化工作流\n- 多模型支持\n- 企业级功能"
  }
];

// 新 mock 数据结构，严格对齐 API/SQL 设计

export const mockLabels = [
  { id: "label-1", name: "AI", level: 0, status: 2 },
  { id: "label-2", name: "RAG", level: 1, status: 2 },
  { id: "label-3", name: "Chatbot", level: 1, status: 2 },
  { id: "label-4", name: "自动化", level: 10, status: 2 }
];

export const mockUsers = [
  {
    id: "user-1",
    email: "alice@example.com",
    password: "******",
    accountType: "自注册",
    name: "Alice",
    avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Alice",
    isVerified: true,
    isOfficial: false,
    permission: "user",
    bio: "AI 爱好者",
    createdAt: "2024/01/01"
  },
  {
    id: "user-2",
    email: "bob@example.com",
    password: "******",
    accountType: "Google",
    name: "Bob",
    avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Bob",
    isVerified: false,
    isOfficial: false,
    permission: "user",
    bio: "RAG 专家",
    createdAt: "2024/02/01"
  }
];

export const mockSceneListResponse = {
  scenes: [
    {
      id: "scene-1",
      title: "AI 智能助手",
      mainLabel: "AI",
      subcategory: "Featured AI templates",
      labels: ["label-1", "label-3"],
      typeId: { dify: "dify-1", n8n: "n8n-1" },
      clicks: 1234,
      downloads: 567,
      status: 2,
      createdAt: "2024-01-01T12:00:00Z",
      createdBy: "user-1",
      updatedAt: "2024-02-01T12:00:00Z",
      updatedBy: "user-2",
      author: {
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Alice",
        isVerified: true,
        isOfficial: false
      }
    },
    {
      id: "scene-2",
      title: "RAG 文档问答",
      mainLabel: "RAG",
      subcategory: "Featured AI templates",
      labels: ["label-2", "label-4"],
      typeId: { dify: "dify-2", n8n: "n8n-2" },
      clicks: 888,
      downloads: 222,
      status: 2,
      createdAt: "2024-03-01T12:00:00Z",
      createdBy: "user-2",
      updatedAt: "2024-03-10T12:00:00Z",
      updatedBy: "user-2",
      author: {
        name: "Bob",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Bob",
        isVerified: false,
        isOfficial: false
      }
    },
    {
      id: "scene-3",
      title: "销售自动化机器人",
      mainLabel: "Sales",
      subcategory: "Sales Automation",
      labels: ["label-4"],
      typeId: { dify: "dify-3", n8n: "n8n-3" },
      clicks: 500,
      downloads: 120,
      status: 2,
      createdAt: "2024-04-01T12:00:00Z",
      createdBy: "user-1",
      updatedAt: "2024-04-10T12:00:00Z",
      updatedBy: "user-1",
      author: {
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Alice",
        isVerified: true,
        isOfficial: false
      }
    },
    {
      id: "scene-4",
      title: "IT 系统监控助手",
      mainLabel: "IT Ops",
      subcategory: "System Monitoring",
      labels: ["label-1"],
      typeId: { dify: "dify-4", n8n: "n8n-4" },
      clicks: 300,
      downloads: 80,
      status: 2,
      createdAt: "2024-05-01T12:00:00Z",
      createdBy: "user-2",
      updatedAt: "2024-05-10T12:00:00Z",
      updatedBy: "user-2",
      author: {
        name: "Bob",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Bob",
        isVerified: false,
        isOfficial: false
      }
    },
    {
      id: "scene-5",
      title: "市场营销邮件生成器",
      mainLabel: "Marketing",
      subcategory: "Email Marketing",
      labels: ["label-1", "label-4"],
      typeId: { dify: "dify-5", n8n: "n8n-5" },
      clicks: 200,
      downloads: 60,
      status: 2,
      createdAt: "2024-06-01T12:00:00Z",
      createdBy: "user-1",
      updatedAt: "2024-06-10T12:00:00Z",
      updatedBy: "user-1",
      author: {
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Alice",
        isVerified: true,
        isOfficial: false
      }
    },
    {
      id: "scene-6",
      title: "文档自动化处理",
      mainLabel: "Document Ops",
      subcategory: "Document Automation",
      labels: ["label-3"],
      typeId: { dify: "dify-6", n8n: "n8n-6" },
      clicks: 150,
      downloads: 40,
      status: 2,
      createdAt: "2024-07-01T12:00:00Z",
      createdBy: "user-2",
      updatedAt: "2024-07-10T12:00:00Z",
      updatedBy: "user-2",
      author: {
        name: "Bob",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Bob",
        isVerified: false,
        isOfficial: false
      }
    },
    {
      id: "scene-7",
      title: "多模态情感分析",
      mainLabel: "AI",
      subcategory: "Multimodal AI",
      labels: ["label-1", "label-2"],
      typeId: { dify: "dify-7", n8n: "n8n-7" },
      clicks: 100,
      downloads: 30,
      status: 2,
      createdAt: "2024-08-01T12:00:00Z",
      createdBy: "user-1",
      updatedAt: "2024-08-10T12:00:00Z",
      updatedBy: "user-1",
      author: {
        name: "Alice",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Alice",
        isVerified: true,
        isOfficial: false
      }
    },
    {
      id: "scene-8",
      title: "客服工单系统",
      mainLabel: "Support",
      subcategory: "Ticket System",
      labels: ["label-4"],
      typeId: { dify: "dify-8", n8n: "n8n-8" },
      clicks: 80,
      downloads: 20,
      status: 2,
      createdAt: "2024-09-01T12:00:00Z",
      createdBy: "user-2",
      updatedAt: "2024-09-10T12:00:00Z",
      updatedBy: "user-2",
      author: {
        name: "Bob",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Bob",
        isVerified: false,
        isOfficial: false
      }
    }
  ],
  count: 8,
  total: 8,
  page: 1,
  totalPages: 1
};

export const mockSceneDetailResponse = {
  templates: [
    {
      id: "scene-1",
      title: "AI 智能助手",
      author: {
        name: "Alice",
        user_email: "alice@example.com",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Alice",
        isVerified: true,
        isOfficial: false
      },
      downloads: 567,
      category: "AI",
      subcategory: "Featured AI templates",
      labels: ["AI", "Chatbot"],
      dslFiles: [
        { platformName: "Dify", fileUrl: "https://example.com/dify-1.dsl", svgPreview: "https://example.com/dify-1.svg" },
        { platformName: "n8n", fileUrl: "https://example.com/n8n-1.dsl", svgPreview: "https://example.com/n8n-1.svg" }
      ],
      readme: "# AI 智能助手\n\n- 支持多平台\n- 智能对话\n- 语音识别"
    }
  ]
};

export const mockUserInfo = {
  id: "user-1",
  email: "alice@example.com",
  name: "Alice",
  avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Alice",
  isVerified: true,
  isOfficial: false,
  permission: "user",
  bio: "AI 爱好者",
  createdAt: "2024/01/01"
};

export const mockTagList = [
  { id: "label-1", name: "AI", level: 0, status: 2 },
  { id: "label-2", name: "RAG", level: 1, status: 2 },
  { id: "label-3", name: "Chatbot", level: 1, status: 2 },
  { id: "label-4", name: "自动化", level: 10, status: 2 }
];

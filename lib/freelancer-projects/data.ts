import type { FreelancerProject } from "./types"

export const projects: FreelancerProject[] = [
  {
    slug: "memoriza",
    title: "Memoriza",
    description:
      "O Memoriza é um e-commerce completo para compra de artigos de papelaria personalizáveis, desenvolvida com foco em produção real.",
    date: "2026-01-10",
    status: "Ativo",
    tags: ["C#", "ASP.NET", "Next.js", "React", "TypeScript", "PostgreSQL", "AWS EC2", "Google OAuth", "Mercado Pago"],
    complexity: 70,
    stack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind"],
      backend: ["C#", "ASP.NET Core 8", "Fluent Validation"],
      database: ["PostgreSQL (Supabase)"],
      infra: ["AWS EC2", "GitHub Actions"],
    },
    highlights: ["Auth JWT + Cookies HttpOnly / OAuth Google", "Pagamentos Mercado Pago", "Controle de funcionários + logs", "outros..."],
    coverImage: "/memoriza.png",
    galleryImages: [
      { src: "/memoriza/001 - homepage.png", alt: "Dashboard principal", caption: "Visão geral do painel administrativo" },
      { src: "/memoriza/002 - produtos.png", alt: "Listagem de Produtos", caption: "Gerenciamento de catálogo de produtos" },
      { src: "/memoriza/003 - detalhe-produtos.png", alt: "Detalhes do Produto", caption: "Visualização detalhada e edição de produtos" },
      { src: "/memoriza/004 - dashboard.png", alt: "Dashboard de Vendas", caption: "Métricas de vendas e desempenho" },
      { src: "/memoriza/005 - dashboard2.png", alt: "Análise de Métricas", caption: "Gráficos e relatórios avançados" },
      { src: "/memoriza/006 - produtos.png", alt: "Gerenciamento de Produtos", caption: "Interface de cadastro e edição" },
      { src: "/memoriza/007 - categorias.png", alt: "Categorias", caption: "Organização de categorias de produtos" },
      { src: "/memoriza/008 - pedidos.png", alt: "Gestão de Pedidos", caption: "Acompanhamento de status de pedidos" },
      { src: "/memoriza/009 - detalhes-pedido.png", alt: "Detalhes do Pedido", caption: "Informações completas do pedido" },
      { src: "/memoriza/010 - frete.png", alt: "Configuração de Frete", caption: "Gestão de regras de envio" },
      { src: "/memoriza/011 - funcionários.png", alt: "Funcionários", caption: "Controle de acesso e equipe" },
      { src: "/memoriza/012 - grupos.png", alt: "Grupos de Acesso", caption: "Permissões e níveis de acesso" },
      { src: "/memoriza/013 - logs.png", alt: "Logs do Sistema", caption: "Auditoria e rastreamento de ações" },
      { src: "/memoriza/014 - login.png", alt: "Login", caption: "Autenticação segura" },
      { src: "/memoriza/015 - cadastro.png", alt: "Cadastro", caption: "Registro de novos usuários" },
      { src: "/memoriza/016 - perfil.png", alt: "Perfil", caption: "Gerenciamento de conta do usuário" },
      { src: "/memoriza/017 - trocar-senha.png", alt: "Segurança", caption: "Alteração de senha" },
      { src: "/memoriza/018 - deletar-conta.png", alt: "Zona de Perigo", caption: "Opções de exclusão de conta" },
      { src: "/memoriza/019 - endereços.png", alt: "Endereços", caption: "Gerenciamento de endereços de entrega" },
      { src: "/memoriza/020 - pedidos.png", alt: "Histórico", caption: "Histórico de compras do cliente" },
      { src: "/memoriza/021 - carrinho.png", alt: "Carrinho", caption: "Experiência de checkout e carrinho" },
    ],
    architectureImage: "/placeholder.jpg",
    architectureMermaid: `
graph TD
    %% --- Definição de Estilos ---
    classDef user fill:#ffffff,stroke:#333,stroke-width:2px,color:#000
    classDef frontend fill:#000000,stroke:#fff,stroke-width:2px,color:#fff
    classDef backend fill:#512bd4,stroke:#fff,stroke-width:2px,color:#fff
    classDef aws fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:#fff
    classDef db fill:#336791,stroke:#333,stroke-width:2px,color:#fff
    classDef ext fill:#444444,stroke:#333,stroke-width:2px,color:#fff

    User(("👤 Usuário")):::user

    subgraph Vercel [Frontend Hosting Vercel]
        Client["🖥️ Memoriza Web (Next.js 16)"]:::frontend
    end

    subgraph AWS [AWS Cloud Infrastructure]
        direction TB
        
        subgraph Compute [Computação EC2]
            EC2_Instance[("EC2 Windows Server")]:::aws
            API["Backend API (.NET Core)"]:::backend
        end
        
        S3["AWS S3 (Imagens)"]:::aws
    end

    subgraph Data [Camada de Dados]
        Postgres[("PostgreSQL<br/>(Supabase)")]:::db
        Mongo[("MongoDB (Logs)")]:::db
    end

    subgraph External [Integrações]
        MercadoPago["Mercado Pago"]:::ext
        GoogleAuth["Google Auth"]:::ext
        Correios["Correios API"]:::ext
    end

    %% Conexões Principais
    User ==>|HTTPS| Client
    Client ==>|API REST| API
    
    %% Vínculo Lógico
    EC2_Instance -.->|Hospeda| API

    %% Conexões Internas AWS
    API -->|AWS SDK| S3

    %% Conexões com Dados
    API <-->|EF Core| Postgres
    API -->|Driver| Mongo

    %% Integrações
    API -->|HTTP| MercadoPago
    API -->|OAuth| GoogleAuth
    API -->|SOAP| Correios

    %% Retorno Webhook
    MercadoPago -.->|Webhook| API

    %% --- Forçar Layout Vertical ---
    %% Isso empurra a camada de Dados para baixo da AWS
    S3 ~~~ Postgres
    
    %% Isso empurra as Integrações para baixo dos Dados
    Postgres ~~~ MercadoPago
`,

    summary:
      "O Memoriza é uma aplicação fullstack voltada para a venda de artigos de papelaria personalizáveis. O projeto foi desenvolvido pensando em uso real, com foco em segurança, organização do código e experiência do usuário, contando com interface responsiva adaptada para diferentes tamanhos de tela.",
    problemStatement:
      "Pequenos empreendedores e comerciantes precisam de uma plataforma que seja simples, segura e que permita a gestão de seus negócios de forma eficiente.",
    objectives: [
      "Expor sua galeria de produtos, facilitando a compra de seus clientes",
      "Oferecer personalização de produtos para atender às necessidades específicas de cada cliente",
      "Sistema completo de frete e pagamentos",
    ],
    targetUsers: "Clientes, buscando comprar artigos de papelaria personalizáveis.",
    keyFeatures: [
      "Autenticação via JWT e Cookies HttpOnly",
      "Autenticação via Google OAuth",
      "Gerenciamento de produtos, pedidos, cores, tamanhos, categorias",
      "Dashboard dinâmico atualizado em tempo real",
      "Postagem dos pedidos em transporte",
      "Sistema de permissões por cargo, controle de funcionários e logs",
      "Gerenciamento de frete e seus valores por CEP",
      "Gerenciamento de reembolso por aprovação",
      "Integração com Mercado Pago para pagamentos via Pix e Cartão de Crédito",
      "Interface responsiva adaptada para diferentes tamanhos de tela",
    ],

    architectureExplanation:
      "Arquitetura baseada em Clean Architecture MVC, priorizando microsserviços e organização. O front-end TypeScript com React/Next.js se comunica com a API ASP.NET via REST. O backend segue o padrão com C# e ASP.NET Core, priorizando rotas separadas por permissões. Hospedagem AWS EC2 e banco de dados Supabase como principal, incluindo configuração RLS (Row-Level Security), MongoDB para logs.",
    folderStructure: `src/
├── memoriza-frontend/
│   ├── app/
│   │   ├── account/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── minha-conta/
│   │   ├── payment/
│   │   ├── products/
│   │   └── globals.css
│   │   └── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── all-components.tsx
│   ├── lib/
│   │   ├── auth-context.tsx
│   │   └── cart-context.tsx
│   │   └── currency-utils.ts
│   │   └── employee-types.ts
│   │   └── installment-calculator.ts
│   │   └── use-permissions.ts
│   │   └── cart-context.ts
│   └── hooks/
│       ├── use-mobile.ts
│       └── use-toast.ts
├── memoriza-backend/
│   ├── Controller/
│   │   ├── Admin/
│   │   └── Auth/
│   │   └── Payment/
│   │   └── User/
│   ├── Filters/
│   ├── Helpers/
│   ├── Models/
│   │   ├── Admin/
│   │   └── Auth/
│   │   └── DTO/
│   │   └── Entities/
│   │   └── Mercado Pago/
│   ├── Repositories/
│   │   ├── Admin/
│   │   └── Auth/
│   │   └── Profile/
│   ├── Services/
│   │   ├── Admin/
│   │   └── Auth/
│   │   └── BackgroundsJobs/
│   │   └── Payments/
│   │   └── Profile/
│   ├── Settings/
│   ├── Validations/
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── User/
│   └── Program.cs
└── appsettings.json`,

    keyDecisions: [
      {
        decision: "Next.js/React.js com Tailwind e TypeScript para o front-end",
        reason: "SSR para SEO, App Router para layouts complexos, e excelente DX com TypeScript.",
      },
      {
        decision: "C# com ASP.NET Core utilizando Dapper para acesso a dados",
        reason: "Alta performance com queries SQL otimizadas, baixo overhead comparado a ORMs completos e maior controle sobre o acesso ao banco.",
      },
      {
        decision: "AWS EC2 hospedagem do backend com PostgreSQL (Supabase) como banco principal, utilizando MongoDB para logs",
        reason:
          "PostgreSQL para dados relacionais e transacionais com acesso eficiente via Dapper, e MongoDB para armazenamento de logs e dados não estruturados.",
      },
    ],

    databaseType: "Supabase",
    databaseSchema: [
      {
        name: "addresses",
        description: "Tabela de endereços dos usuários.",
        entityCode: `public class Address {
    public Guid Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string Number { get; set; } = string.Empty;
    public string? Complement { get; set; }
    public string Neighborhood { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public string Country { get; set; } = "Brasil";
    public bool IsDefault { get; set; }
    public DateTime CreatedAt { get; set; }
}`,
        sqlCode: `CREATE TABLE addresses (
    id UUID PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    label VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(50) NOT NULL,
    complement VARCHAR(255),
    neighborhood VARCHAR(150) NOT NULL,
    city VARCHAR(150) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'Brasil',
    is_default BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL
);`
      },
      {
        name: "carousel_items",
        description: "Tabela de carrossel de imagens.",
        entityCode: `public class CarouselItem {
    public Guid Id { get; set; }
    public string? Title { get; set; } = null!;
    public string? Subtitle { get; set; }
    public string? CtaText { get; set; }
    public string? CtaLink { get; set; }
    public string ImagePath { get; set; } = null!;
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
    public DateTime CreatedAt { get; set; }
    public string TemplateType { get; set; } = "default";    
}`,
        sqlCode: `CREATE TABLE carousel_items (
    id UUID PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    cta_text TEXT,
    cta_link TEXT,
    image_path TEXT NOT NULL,
    is_active BOOLEAN NOT NULL,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    template_type TEXT NOT NULL DEFAULT 'default'
);`
      },
      {
        name: "cart_items",
        description: "Tabela principal de produtos com relacionamentos e controle de estoque.",
        entityCode: `public class CartItem {
    public Guid Id { get; set; }
    public Guid CartId { get; set; }
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Subtotal { get; set; }
    public string? PersonalizationText { get; set; }
    public int? SizeId { get; set; }
    public int? ColorId { get; set; }
    public string? SizeName { get; set; }
    public string? ColorName { get; set; }
    public Cart? Cart { get; set; }
}`,
        sqlCode: `CREATE TABLE cart_items (
      id UUID PRIMARY KEY,
      cart_id UUID NOT NULL,
      product_id UUID NOT NULL,
      product_name TEXT NOT NULL,
      thumbnail_url TEXT,
      quantity INTEGER NOT NULL,
      unit_price NUMERIC(18,2) NOT NULL,
      subtotal NUMERIC(18,2) NOT NULL,
      personalization_text TEXT,
      size_id INTEGER,
      color_id INTEGER,
      size_name TEXT,
      color_name TEXT
);`
      },
      {
        name: "carts",
        description: "Tabela principal de produtos com relacionamentos e controle de estoque.",
        entityCode: `public class Cart {
    public Guid Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public List<CartItem> Items { get; set; } = new();
}`,
        sqlCode: `CREATE TABLE carts (
    id UUID PRIMARY KEY,
    user_id TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id)
);`
      },
      {
        name: "color",
        description: "Tabela principal de produtos com relacionamentos e controle de estoque.",
        entityCode: `public class Color {
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? HexCode { get; set; }
    public bool IsActive { get; set; } = true;
}`,
        sqlCode: `CREATE TABLE colors (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    hex_code TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);`
      },
      {
        name: "category",
        description: "Tabela principal de produtos com relacionamentos e controle de estoque.",
        entityCode: `public class Category {
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}`,
        sqlCode: `CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL
);`
      },
      {
        name: "employee_access_logs",
        description: "Tabela principal de produtos com relacionamentos e controle de estoque.",
        entityCode: `public class EmployeeAccessLog {
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public string Action { get; set; } = string.Empty;
    public string Module { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}`,
        sqlCode: `CREATE TABLE employee_access_logs (
    id UUID PRIMARY KEY,
    employee_id UUID NOT NULL,
    action TEXT NOT NULL,
    module TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,

    CONSTRAINT fk_employee_access_logs_employee 
        FOREIGN KEY (employee_id) REFERENCES employees(id)
);`
      },
      {
        name: "employees",
        description: "Tabela principal de produtos com relacionamentos e controle de estoque.",
        entityCode: `public class Employee {
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid GroupId { get; set; }
    public string Cpf { get; set; } = string.Empty;
    public DateTime HireDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}`,
        sqlCode: `CREATE TABLE employees (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    group_id UUID NOT NULL,
    cpf TEXT NOT NULL,
    hire_date DATE NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,

    CONSTRAINT fk_employee_user 
        FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT fk_employee_group 
        FOREIGN KEY (group_id) REFERENCES groups(id)
);`
      },
      {
        name: "order_items",
        description: "Tabela principal de produtos com relacionamentos e controle de estoque.",
        entityCode: `public class OrderItem {
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Subtotal { get; set; }
    public string? PersonalizationText { get; set; }
    public int? SizeId { get; set; }
    public int? ColorId { get; set; }
    public string? SizeName { get; set; }
    public string? ColorName { get; set; }
    public Order? Order { get; set; }
}`,
        sqlCode: `CREATE TABLE order_items (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,
    product_name TEXT NOT NULL,
    thumbnail_url TEXT,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(18,2) NOT NULL,
    subtotal NUMERIC(18,2) NOT NULL,
    personalization_text TEXT,
    size_id INTEGER,
    color_id INTEGER,
    size_name TEXT,
    color_name TEXT,

    CONSTRAINT fk_order_items_order 
        FOREIGN KEY (order_id) REFERENCES orders(id)
);`
      },
      {
        name: "order_status_history",
        description: "Tabela principal de produtos com relacionamentos e controle de estoque.",
        entityCode: `public class OrderStatusHistory {
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public int Status { get; set; }
    public Guid ChangedByUserId { get; set; }
    public DateTime ChangedAt { get; set; }
    public string? Note { get; set; }
}`,
        sqlCode: `CREATE TABLE order_status_history (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL,
    status INTEGER NOT NULL,
    changed_by_user_id UUID NOT NULL,
    changed_at TIMESTAMPTZ NOT NULL,
    note TEXT,

    CONSTRAINT fk_order_status_history_order
        FOREIGN KEY (order_id) REFERENCES orders(id),

    CONSTRAINT fk_order_status_history_user
        FOREIGN KEY (changed_by_user_id) REFERENCES users(id)
);`
      },
      {
        name: "order",
        description: "Tabela principal de produtos com relacionamentos e controle de estoque.",
        entityCode: `public class Order {
    public Guid Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string? CustomerEmail { get; set; }
    public string? CustomerPhone { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal Subtotal { get; set; }
    public decimal ShippingAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public List<OrderItem> Items { get; set; } = new();
    public string Status { get; set; } = OrderStatusCodes.Pending;
    public string ShippingCode { get; set; } = string.Empty;
    public string ShippingName { get; set; } = string.Empty;
    public int ShippingEstimatedDays { get; set; }
    public Guid? ShippingAddressId { get; set; }
    public string ShippingStreet { get; set; } = string.Empty;
    public string ShippingNumber { get; set; } = string.Empty;
    public string? ShippingComplement { get; set; }
    public string ShippingNeighborhood { get; set; } = string.Empty;
    public string ShippingCity { get; set; } = string.Empty;
    public string ShippingState { get; set; } = string.Empty;
    public string ShippingZipCode { get; set; } = string.Empty;
    public string ShippingCountry { get; set; } = "Brasil";
    public string? ShippingPhone { get; set; }
    public string? PersonalizationNotes { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public string? TrackingCode { get; set; }
    public string? TrackingCompany { get; set; }
    public string? TrackingUrl { get; set; }
    public bool IsRefundable { get; set; }
    public string? RefundStatus { get; set; }
    public string? RefundReason { get; set; }
    public DateTime? RefundRequestedAt { get; set; }
    public DateTime? RefundProcessedAt { get; set; }
    public string? PreferenceId { get; set; }
    public string? InitPoint { get; set; }
    public string? SandboxInitPoint { get; set; }
    public long? PaymentId { get; set; }
}`,
        sqlCode: `CREATE TABLE orders (
    id UUID PRIMARY KEY,
    order_number TEXT NOT NULL,
    user_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    created_at TIMESTAMP NOT NULL,
    subtotal NUMERIC(18,2) NOT NULL,
    shipping_amount NUMERIC(18,2) NOT NULL,
    total_amount NUMERIC(18,2) NOT NULL,
    status TEXT NOT NULL,
    shipping_code TEXT NOT NULL,
    shipping_name TEXT NOT NULL,
    shipping_estimated_days INTEGER NOT NULL,
    shipping_address_id UUID,
    shipping_street TEXT NOT NULL,
    shipping_number TEXT NOT NULL,
    shipping_complement TEXT,
    shipping_neighborhood TEXT NOT NULL,
    shipping_city TEXT NOT NULL,
    shipping_state TEXT NOT NULL,
    shipping_zip_code TEXT NOT NULL,
    shipping_country TEXT NOT NULL DEFAULT 'Brasil',
    shipping_phone TEXT,
    personalization_notes TEXT,
    delivered_at TIMESTAMP,
    tracking_code TEXT,
    tracking_company TEXT,
    tracking_url TEXT,
    is_refundable BOOLEAN NOT NULL,
    refund_status TEXT,
    refund_reason TEXT,
    refund_requested_at TIMESTAMP,
    refund_processed_at TIMESTAMP,
    preference_id TEXT,
    init_point TEXT,
    sandbox_init_point TEXT,
    payment_id BIGINT,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id)
);`
      },
      {
        name: "product_colors",
        description: "Usuários do sistema com role-based access control.",
        entityCode: `public class ProductColor {
    public Guid ProductId { get; set; }
    public int ColorId { get; set; }
}`,
        sqlCode: `CREATE TABLE product_colors (
    product_id UUID NOT NULL,
    color_id INT4 NOT NULL,
    PRIMARY KEY (product_id, color_id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (color_id) REFERENCES colors(id)
);`
      },
      {
        name: "product_images",
        description: "Usuários do sistema com role-based access control.",
        entityCode: `public class ProductImage {
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? AltText { get; set; }
    public bool IsPrimary { get; set; }
    public int DisplayOrder { get; set; }
    public DateTime CreatedAt { get; set; }
}`,
        sqlCode: `CREATE TABLE product_images (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL,

    CONSTRAINT fk_product_images_product
        FOREIGN KEY (product_id) REFERENCES products(id)
);`
      },
      {
        name: "product_sizes",
        description: "Usuários do sistema com role-based access control.",
        entityCode: ` public class ProductSize {
        public Guid ProductId { get; set; }
        public int SizeId { get; set; }
        public decimal? Price { get; set; }
        public decimal? PromotionalPrice { get; set; }
    }`,
        sqlCode: `CREATE TABLE product_sizes (
    product_id UUID NOT NULL,
    size_id INTEGER NOT NULL,
    price NUMERIC(18,2),
    promotional_price NUMERIC(18,2),

    PRIMARY KEY (product_id, size_id),

    CONSTRAINT fk_product_sizes_product
        FOREIGN KEY (product_id) REFERENCES products(id),

    CONSTRAINT fk_product_sizes_size
        FOREIGN KEY (size_id) REFERENCES sizes(id)
);`
      },
      {
        name: "products",
        description: "Usuários do sistema com role-based access control.",
        entityCode: `public class Product {
    public Guid Id { get; set; }
    public Guid CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public bool IsPersonalizable { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal? PromotionalPrice { get; set; }
}`,
        sqlCode: `CREATE TABLE products (
    id UUID PRIMARY KEY,
    category_id UUID NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT,
    price NUMERIC(18,2) NOT NULL,
    is_personalizable BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL,
    promotional_price NUMERIC(18,2),

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
);`
      },
      {
        name: "shipping_regions",
        description: "Usuários do sistema com role-based access control.",
        entityCode: `public class ShippingRegion {
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int EstimatedDays { get; set; }
    public bool IsPickupOption { get; set; }
    public bool IsActive { get; set; }
    public decimal FreeShippingThreshold { get; set; }
}`,
        sqlCode: `CREATE TABLE shipping_regions (
    id UUID PRIMARY KEY,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    price NUMERIC(18,2) NOT NULL,
    estimated_days INTEGER NOT NULL,
    is_pickup_option BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    free_shipping_threshold NUMERIC(18,2) NOT NULL
);`
      },
      {
        name: "sizes",
        description: "Usuários do sistema com role-based access control.",
        entityCode: `public class Size {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}`,
        sqlCode: `CREATE TABLE sizes (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL
);`
      },
      {
        name: "user_group_permissions",
        description: "Usuários do sistema com role-based access control.",
        entityCode: `public class UserGroupPermission {
    public long Id { get; set; }
    public Guid GroupId { get; set; }
    public string Module { get; set; } = string.Empty;
    public string Actions { get; set; } = string.Empty;
}`,
        sqlCode: `CREATE TABLE user_group_permissions (
    id BIGSERIAL PRIMARY KEY,
    group_id UUID NOT NULL,
    module TEXT NOT NULL,
    actions JSONB NOT NULL,

    CONSTRAINT fk_user_group_permissions_group
        FOREIGN KEY (group_id) REFERENCES groups(id)
);`
      },
      {
        name: "user_groups",
        description: "Usuários do sistema com role-based access control.",
        entityCode: `public class UserGroup {
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public int EmployeeCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}`,
        sqlCode: `CREATE TABLE user_groups (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    employee_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);`
      },
      {
        name: "users",
        description: "Usuários do sistema com role-based access control.",
        entityCode: `public class User {
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string? Phone { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool PasswordResetPending { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public int UserGroupId { get; set; } = (int)UserGroupType.UsuarioComum;
    public Guid? EmployeeGroupId { get; set; }
    public bool IsAdmin => UserGroupId == (int)UserGroupType.Admin;
    public string AuthProvider { get; set; } = "Local";
    public string? ProviderUserId { get; set; }
    public string? ProviderEmail { get; set; }
    public string? PictureUrl { get; set; }
    public bool IsActive { get; set; } = true;
}`,
        sqlCode: `CREATE TABLE users (
    id UUID PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ,
    password_reset_pending BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    user_group_id INTEGER NOT NULL,
    employee_group_id UUID,
    auth_provider TEXT NOT NULL DEFAULT 'Local',
    provider_user_id TEXT,
    provider_email TEXT,
    picture_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_users_employee_group
        FOREIGN KEY (employee_group_id) REFERENCES user_groups(id)
);`
      },
    ],

    endpoints: [
      {
        method: "POST",
        path: "/api/Auth/register",
        description: "Registro de usuário.",
        authRequired: false,
        module: "Auth",
      },
      {
        method: "POST",
        path: "/api/Auth/login",
        description: "Login de usuário via email ou celular com geração de token.",
        authRequired: false,
        module: "Auth",
      },
      {
        method: "POST",
        path: "/api/profile/addresses",
        description: "Adiciona um endereço ao perfil do usuário.",
        authRequired: true,
        module: "Profile",
      },
      {
        method: "GET",
        path: "/api/admin/dashboard/top-products",
        description: "Retorna os produtos mais vendidos no dashboard do administrador.",
        authRequired: true,
        module: "Admin",
      },
      {
        method: "GET",
        path: "/api/admin/employee-logs",
        description: "Retorna os logs de funcionários do sistema.",
        authRequired: true,
        module: "Admin",
      },
      {
        method: "PUT",
        path: "/api/admin/employees/{id}",
        description: "Atualiza os dados de um funcionário.",
        authRequired: true,
        module: "Admin",
      },
      {
        method: "DELETE",
        path: "/api/admin/groups/{id}",
        description: "Deleta um grupo de funcionários, por exemplo: Estoque, financeiro, etc.",
        authRequired: true,
        module: "Admin",
      },
      {
        method: "GET",
        path: "/api/admin/orders",
        description: "Retorna os pedidos do sistema.",
        authRequired: true,
        module: "Admin",
      },
      {
        method: "GET",
        path: "/api/admin/shipping/regions",
        description: "Retorna as regiões de envio do sistema.",
        authRequired: true,
        module: "Admin",
      },
      {
        method: "DELETE",
        path: "/api/carousel-items/{id}",
        description: "Deleta um item do carrossel de imagens.",
        authRequired: true,
        module: "Admin",
      },
      {
        method: "POST",
        path: "/api/user/cart/items",
        description: "Adiciona um item ao carrinho do usuário.",
        authRequired: true,
        module: "User",
      },
      {
        method: "POST",
        path: "/api/categories",
        description: "Adiciona uma categoria ao sistema.",
        authRequired: true,
        module: "Admin",
      },

      {
        method: "GET",
        path: "/api/auth/google/login",
        description: "Autenticação com Google.",
        authRequired: false,
        module: "Auth",
      },
      {
        method: "POST",
        path: "/api/payments/mercadopago/webhook",
        description: "Webhook do Mercado Pago.",
        authRequired: false,
        module: "Payments",
      },
      {
        method: "GET",
        path: "/api/products",
        description: "Retorna os produtos do sistema.",
        authRequired: false,
        module: "Products",
      },
      {
        method: "PUT",
        path: "/api/user/profile",
        description: "Atualiza o perfil do usuário.",
        authRequired: true,
        module: "User",
      },
    ],

    authStrategy:
      "JWT com refresh token em HttpOnly cookie. Access token com expiração de 480 minutos (8 horas). OAuth2 opcional com Google para login social.",
    roles: ["Administrador", "Funcionários", "Clientes"],
    vulnerabilitiesAvoided: [
      "XSS: sanitização de inputs com Fluent Validation",
      "RLS: Row Level Security adicionado em todas as tabelas",
      "Todas as rotas protegidas por autenticação",
    ],
    storageStrategy:
      "Refresh token em HttpOnly secure cookie, tokens expirados em 480 minutos (8 horas). Nenhum dado sensivel em localStorage.",
    inputValidation:
      "Validação no back-end com Fluent Validation.",

    envExample: `# Front-end (.env.local)
# GOOGLE OAUTH CLIENT
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_FRONTEND_URL=

# MERCADOPAGO ENVIRONMENT
# Valores possíveis: "test" ou "production"
NEXT_PUBLIC_MERCADOPAGO_ENV=

# MERCADOPAGO PUBLIC KEY (de produção)
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=

=========================================================

# Back-end (appsettings.json)
{
  "Jwt": {
  "SecretKey": "",
  "Issuer": "memoriza-backend",
  "Audience": "memoriza-frontend",
  "ExpiresInMinutes": "480"
},
"ConnectionStrings": {
  "DefaultConnection": ""
},
"Google": {
  "ClientId": "",
  "ClientSecret": "",
  "FrontendBaseUrl": ""
},
"MongoSettings": {
  "ConnectionString": "",
  "Database": "memoriza_logs"
},
"MercadoPago": {
  "AccessToken": "",
  "PublicKey": "",
  "WebhookSecret": "",
  "NotificationUrl": "",
  "SuccessUrl": "",
  "FailureUrl": "",
  "PendingUrl": "",
  "Environment": "" // test or production
},
"OrderCancellation": {
  "ExpirationHours": 6,
  "CheckIntervalMinutes": 60
}`,
    configExplanation:
      "Variáveis de ambiente separadas entre front-end e back-end. As keys foram configuradas diretamente na AWS EC2 e Vercel.",

    deploymentStrategy:
      "Front-end deployado no Vercel com automatic previews por PR. Back-end rodando na AWS EC2. Postgres (Supabase) para banco de dados e MongoDB Atlas para banco de logs.",
    cicdSummary: `1. Push para branch main ou execução manual
2. GitHub Actions é acionado automaticamente
3. Restore e build da aplicação com .NET 8
4. Publicação dos artefatos (publish)
5. Transferência dos arquivos para EC2 via SSH (rsync)
6. Restart do serviço backend via systemctl`,
    whatWentWell: [
      "Estrutura MVC facilitou adicionar novos módulos sem afetar existentes",
      "O uso do Fluent Validation me ajudou na qualidade e manutenibilidade do código",
      "MongoDB flexibilizou a leitura de logs e melhorar a correção de erros",
      "Utilizar rotas autorizadas nos controllers melhorou a segurança do código",
    ],
    whatToImprove: [
      "Rate limiting em endpoints de login (5 tentativas/min)",
      "Implementar testes unitários e garantir a qualidade do sistema",
      "Implementar testes de integração para garantir a qualidade do sistema",
      "Implementar notificação de código de rastreio via e-mail",
    ],

    deployUrl: "https://memoriza.store",
    repoUrl: "https://github.com/nicholasdeway/memoriza",
  },
  {
    slug: "sorriso-harmony",
    title: "Sorriso Harmony",
    description:
      "Sorriso Harmony é um site web-back-end, onde os pacientes poderão conhecer os serviços oferecidos, ver fotos e vídeos de procedimentos, além de agendar consultas de forma prática escolhendo o dentista e o horário disponível, enquanto a clínica terá uma agenda organizada com confirmações e lembretes automáticos.",
    date: "2025-12-07",
    status: "Finalizado",
    tags: ["Next.js", "ASP.NET Core", "Azure SQL Server", "Google OAuth"],
    complexity: 70,
    stack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["C#", "ASP.NET Core"],
      database: ["Azure SQL Database"],
      infra: ["Azure App Service", "Azure", "GitHub Actions"],
    },
    highlights: ["Auth JWT + OAuth Google", "Agendamento de consultas", "Painel de conversão de pacientes"],
    coverImage: "/sorriso-harmony.png",
    galleryImages: [
      { src: "/sorriso-harmony/001 - responsividade.png", alt: "Responsividade da solução", caption: "Responsividade da solução" },
      { src: "/sorriso-harmony/002 - homepage.png", alt: "Homepage", caption: "Homepage" },
      { src: "/sorriso-harmony/003 - serviços.png", alt: "Serviços da clínica", caption: "Serviços da clínica" },
      { src: "/sorriso-harmony/004 - footer.png", alt: "Footer", caption: "Footer" },
      { src: "/sorriso-harmony/005 - login.png", alt: "Login", caption: "Login" },
      { src: "/sorriso-harmony/006 - cadastro.png", alt: "Cadastro", caption: "Cadastro" },
      { src: "/sorriso-harmony/007 - ficha.png", alt: "Ficha anamnese", caption: "Ficha anamnese" },
      { src: "/sorriso-harmony/008 - painel-admin.png", alt: "Painel administrativo", caption: "Painel administrativo" },
      { src: "/sorriso-harmony/009 - cadastro-dentista.png", alt: "Cadastro de dentistas", caption: "Cadastro de dentistas" },
      { src: "/sorriso-harmony/010 - equipe.png", alt: "Equipe da clínica", caption: "Equipe da clínica" },
      { src: "/sorriso-harmony/011 - conversão.png", alt: "Conversão de pacientes", caption: "Conversão de pacientes" },
      { src: "/sorriso-harmony/012 - consultas.png", alt: "Consultas", caption: "Consultas" },
      { src: "/sorriso-harmony/013 - agendamentos.png", alt: "Agendamentos de consultas", caption: "Agendamentos de consultas" },
    ],

    summary:
      "Sistema de agendamento de consultas para clinicas odontologicas, com controle de pacientes, agendamentos, consultas, fichas anamnese, equipe, conversão de pacientes e dashboard administrativo.",
    problemStatement:
      "Clinicas pequenas e medias no Brasil ainda dependem de planilhas e sistemas legados para gerenciar agendamentos, pacientes e faturamento. A falta de integração entre esses processos gera perda de tempo, erros e dificuldade na conversão de agendamentos e controle de pacientes.",
    objectives: [
      "Centralizar gestão de pacientes, conversão de agendamentos e controle de consultas.",
      "Oferecer dashboard com métricas em tempo real para tomada de decisão.",
      "Garantir que o cliente consiga agendar ou cancelar suas consultas de forma autônoma.",
      "Controle de equipe e dentistas.",
      "Localização de clientes por geolocalização, melhorando a eficácia do marketing.",
    ],
    targetUsers: "Administradores e recepcionistas de clinicas odontológicas de pequeno e médio porte.",
    keyFeatures: [
      "Agendamento em tempo real com notificações",
      "Ficha anamnese para pacientes",
      "Dashboard com gráfico de geolocalização para marketing",
      "Controle de equipe e dentistas",
      "Visualização de antes e depois de alguns procedimentos",
      "Autonomia de paciente visualizar suas consultas passadas e futuras"
    ],

    architectureExplanation:
      "Arquitetura baseada em Clean Architecture com separação de microsserviço e padronização MVC. O front-end Next.js/React se comunica com a API ASP.NET via REST. O back-end segue o padrão C# com ASP.NET Core.",
    folderStructure: `src/
├── sorriso-harmony-frontend/                 # Next.js/React - Frontend
│   ├── app/
│   │   ├── admin/
│   │   ├── api/analytics
│   │   ├── dentists
│   │   ├── google/callback
│   │   ├── login
│   │   ├── patient
│   │   ├── perfil
│   │   ├── reset-password
│   │   ├── testemonials
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   ├── perfil/
│   │   └── ui/
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── categories-api.ts
│   │   ├── conflicts.ts
│   │   ├── crypto.ts
│   │   ├── geo.ts
│   │   ├── interested.ts
│   │   ├── jwt.ts
│   │   ├── procedures.ts
│   │   └── utils.ts
│   └── service/
│       ├── relatorioService.ts
│       └── userService.ts

├── sorriso-harmony-api/                       # C# + ASP.NET Core - Backend
│   ├── Controllers/
│   ├── Data/
│   ├── Infrastructure/
│   ├── Data/
│   ├── Middleware/
│   ├── Migrations/
│   ├── Models/
│   ├── Properties/
│   ├── Services/
│   ├── Settings/
│   ├── Shared/
└── └── Program.cs`,

    authStrategy:
      "Autenticação via JWT e OAuth2 opcional com Google para login social.",
    roles: ["Administrador", "Dentista", "Recepcionista", "Paciente"],

    configExplanation:
      "Variaveis de ambiente separadas entre front-end (NEXT_PUBLIC_*) e back-end (appsettings.json). Secrets nunca sao expostos no client-side. Em produção, secrets foram gerenciados via Azure App Service.",

    deploymentStrategy:
      "Front-end deployado no Vercel com automatic previews por PR. Back-end rodando em Azure App Service. Azure SQL Server para banco de dados.",
    cicdSummary: `1. Trigger via push na branch main ou execução manual (workflow_dispatch)
2. Pipeline CI com GitHub Actions
3. Build da aplicação ASP.NET Core (.NET 8)
4. Publicação e geração de artefatos
5. Armazenamento do build como artifact
6. CD com deploy automatizado no Azure App Service`,
    monitoringNotes:
      "Sentry para error tracking em ambos front-end e back-end. Azure Monitor para logs da infra Azure. Uptime Robot para monitoramento de disponibilidade.",

    whatWentWell: [
      "Clean Architecture facilitou adicionar novos módulos sem afetar existentes",
      "Azure Logs flexibilizou consultas de logs",
      "Deploy com GitHub Actions facilitou o deploy",
    ],
    whatToImprove: [
      "Adicionar HttpOnly cookies para autenticação",
      "Implementar tempo de expiração de sessão",
      "Foram adicionado testes unitários na maioria das funcionalidades, mas ainda é preciso implementar o restante para garantir a qualidade do sistema",
    ],

    deployUrl: "https://pmv-ads-2025-2-e5-proj-empext-t4-g2.onrender.com",
    repoUrl: "https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t4-g2-sorriso-harmony",
  },
  {
    slug: "viveiro-gama-e-filha",
    title: "Viveiro Gama e Filha",
    description:
      "O projeto Viveiro Gama e Filha é uma landing page com foco em exposição dos seus produtos, a ponto de gerar experiência para o usuário.",
    date: "2026-02-12",
    status: "Ativo",
    tags: ["React", "TypeScript"],
    complexity: 20,
    stack: {
      frontend: ["React", "TypeScript"],
      backend: [],
      database: [],
      infra: [],
    },
    highlights: ["Responsividade", "Galeria de imagens", "Catálogo de produtos"],
    coverImage: "/viveiro.png",
    galleryImages: [
      { src: "/viveiro/001 - homepage.png", alt: "Home do Viveiro", caption: "Home Page" },
      { src: "/viveiro/002 - homepage.png", alt: "Home do Viveiro", caption: "Home Page" },
      { src: "/viveiro/003 - experiência.png", alt: "Experiência", caption: "Experiência" },
      { src: "/viveiro/004 - coleções.png", alt: "Coleções", caption: "Coleções" },
      { src: "/viveiro/005 - footer.png", alt: "Footer", caption: "Footer" },
      { src: "/viveiro/006 - catálogo.png", alt: "Catálogo", caption: "Catálogo" },
    ],

    summary:
      "Landing page para venda de produtos de jardinagem e plantas.",
    problemStatement:
      "A empresa citou dificuldade de divulgação da sua empresa e produtos, e que seus clientes tinham dificuldade em encontrar os produtos que desejavam.",
    objectives: [
      "Criar plataforma centralizada para venda de produtos de jardinagem e plantas",
      "Oferecer busca inteligente por categoria e produto.",
    ],
    targetUsers: "Clientes do viveiro, moradores da região e turistas.",
    keyFeatures: [
      "Design moderno e responsivo",
      "Animações premium e transições suaves",
      "Cardápio com categorias e produtos",
    ],
    deployUrl: "https://viveiro-landing.vercel.app",
    repoUrl: "https://github.com/nicholasdeway/viveiro-landing",
  },
  {
    slug: "peter-gastrobar",
    title: "Peter Gastrobar",
    description:
      "Landing page moderna, elegante e responsiva desenvolvida com Next.js 16, Tailwind CSS 4, animações premium e modo claro/escuro dinâmico.",
    date: "2025-12-20",
    status: "Ativo",
    tags: ["Next", "Tailwind", "TypeScript"],
    complexity: 20,
    stack: {
      frontend: ["Next", "Tailwind", "Radix UI", "TypeScript"],
      backend: [],
      database: [],
      infra: [],
    },
    highlights: ["Responsividade", "Galeria de imagens", "Catálogo de produtos"],
    coverImage: "/peter.png",
    galleryImages: [
      { src: "/peter/001 - homepage.png", alt: "Home do Peter", caption: "Home Page" },
      { src: "/peter/002 - homepage.png", alt: "Home do Peter", caption: "Home Page" },
      { src: "/peter/003 - cardápio-breve.png", alt: "Cardápio Breve", caption: "Cardápio Breve" },
      { src: "/peter/004 - imagens.png", alt: "Imagens", caption: "Imagens" },
      { src: "/peter/005 - localização.png", alt: "Localização", caption: "Localização" },
      { src: "/peter/006 - cardápio-completo.png", alt: "Cardápio Completo", caption: "Cardápio Completo" },
    ],

    summary:
      "Landing page moderna e responsiva para o restaurante Peter Gastrobar, com foco em experiência visual, galeria de pratos e apresentação do cardápio.",
    problemStatement:
      "O restaurante precisava de uma presença digital profissional que transmitisse a identidade da marca e facilitasse o contato com os clientes.",
    objectives: [
      "O restaurante precisava de um site dinâmico, responsivo e amigável para o público.",
      "O site deveria apresentar o cardápio de forma atraente, com fotos de alta qualidade e descrições detalhadas.",
      "O site deveria facilitar o contato com os clientes, fornecendo informações como endereço e horário de funcionamento.",
    ],
    targetUsers: "Clientes do restaurante, moradores da região e turistas.",
    keyFeatures: [
      "Design moderno e responsivo",
      "Animações premium e transições suaves",
      "Modo claro/escuro dinâmico",
      "Galeria de fotos de alta qualidade",
      "Apresentação detalhada do cardápio",
    ],

    deployUrl: "https://www.petergastrobar.com.br",
    repoUrl: "https://github.com/nicholasdeway/peter-gastrobar-landing",
  },

  {
    slug: "definance",
    title: "Definance | Gestão Financeira Inteligente",
    description:
      "O Definance é uma plataforma inteligente de gestão financeira pessoal integrada ao WhatsApp e Web. Chega de preencher planilhas manuais ou baixar aplicativos complexos: basta enviar uma mensagem de texto ou áudio no WhatsApp para que a IA registre e organize seus gastos, receitas e metas automaticamente, sincronizando tudo em tempo real com um dashboard moderno.",
    date: "2026-06-09",
    status: "Ativo",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", ".NET Core", "FastAPI", "OpenAI API", "WhatsApp Integration"],
    complexity: 95,
    stack: {
      frontend: ["Next.js 16", "React 19", "Tailwind CSS 4", "TypeScript", "GSAP", "Framer Motion", "Lenis", "Shadcn UI", "Recharts"],
      backend: [".NET 8", "C# 12", "ASP.NET Core", "Dapper (Micro-ORM)", "Python 3", "FastAPI", "OpenAI API", "Twilio API"],
      database: ["PostgreSQL", "Supabase"],
      infra: ["Docker / Docker-Compose", "Stripe API", "Mercado Pago API", "Vercel", "MailerSend"],
    },
    highlights: [
      "Assistente de IA no WhatsApp (Texto e Áudio)",
      "Sincronização Bidirecional Contas-Perfil",
      "Assinaturas Recorrentes Multi-Gateway (Stripe/Mercado Pago)",
      "Dashboard Financeiro com Gráficos Interativos"
    ],
    coverImage: "/logo-definance.png",
    galleryImages: [
      { src: "/definance/001 - definance.png", alt: "Tela de proposta comercial do Definance", caption: "Proposta" },
      { src: "/definance/002 - definance.png", alt: "Integração e conversa com IA via WhatsApp", caption: "Interação com IA via WhatsApp" },
      { src: "/definance/003 - definance.png", alt: "Funcionalidades principais do sistema", caption: "Funcionalidades" },
      { src: "/definance/004 - definance.png", alt: "Painel de organização de recursos", caption: "Organização" },
      { src: "/definance/005 - definance.png", alt: "Mockup de apresentação em dispositivos", caption: "Mockup" },
      { src: "/definance/006 - definance.png", alt: "Interface de interação com o usuário", caption: "Interação" },
      { src: "/definance/007 - definance.png", alt: "Página de perguntas frequentes (FAQ)", caption: "FAQ" },
      { src: "/definance/008 - definance.png", alt: "Planos de assinatura e preços", caption: "Planos" },
      { src: "/definance/009 - definance.png", alt: "Rodapé da página institucional (Footer)", caption: "Footer" },
      { src: "/definance/010 - definance.png", alt: "Tela de autenticação e login de usuários", caption: "Autenticação" },
      { src: "/definance/011 - definance.png", alt: "Tela de expiração do plano trial", caption: "Expiração" },
      { src: "/definance/012 - definance.png", alt: "Fluxo de vincular número do WhatsApp", caption: "Vincular número" },
      { src: "/definance/013 - definance.png", alt: "Dashboard financeiro principal", caption: "Dashboard" },
      { src: "/definance/014 - definance.png", alt: "Histórico de transações detalhado", caption: "Histórico de transações" },
      { src: "/definance/015 - definance.png", alt: "Painel de metas financeiras", caption: "Metas" },
      { src: "/definance/016 - definance.png", alt: "Gerenciamento de contas vinculadas", caption: "Minhas Contas" },
      { src: "/definance/017 - definance.png", alt: "Visualização de categorias financeiras", caption: "Categorias" },
      { src: "/definance/018 - definance.png", alt: "Relatórios e estatísticas financeiras", caption: "Relatórios" },
      { src: "/definance/019 - definance.png", alt: "Relatórios e gráficos adicionais", caption: "Relatórios 2" },
      { src: "/definance/020 - definance.png", alt: "Painel de configurações do sistema", caption: "Configurações do sistema" },
      { src: "/definance/021 - definance.png", alt: "Opções de exportação de dados", caption: "Exportação de dados" },
    ],

    summary:
      "Plataforma inovadora de finanças pessoais que integra um painel de controle web em Next.js a um assistente inteligente conversacional no WhatsApp operado por inteligência artificial (Python/FastAPI) e um backend robusto e escalável em .NET 8.",
    problemStatement:
      "A maioria das pessoas falha no controle financeiro pessoal devido à complexidade e atrito de alimentar planilhas ou abrir aplicativos tradicionais todos os dias. O Definance soluciona isso trazendo a conveniência do WhatsApp para o registro instantâneo de transações por voz ou texto, eliminando completamente a fricção diária.",
    objectives: [
      "Desenvolver um painel financeiro (Dashboard) moderno e intuitivo para visualização consolidada de receitas, despesas e metas.",
      "Criar um assistente inteligente integrado ao WhatsApp com capacidade de processamento de linguagem natural (texto e áudio) para comandos financeiros.",
      "Garantir a sincronização bidirecional em tempo real entre o perfil financeiro do onboarding e a persistência de contas e metas.",
      "Implementar um sistema de monetização baseado em planos Premium recorrentes, integrando os gateways da Stripe e Mercado Pago com suporte automático a estornos e cancelamentos.",
      "Assegurar alta performance de leitura e escrita utilizando micro-ORM Dapper sobre banco de dados PostgreSQL hospedado no Supabase."
    ],
    targetUsers: "Pessoas que buscam facilidade e rapidez para gerenciar suas contas e economias, preferindo comandos rápidos de conversação (WhatsApp) no dia a dia combinados a uma interface web limpa para análises aprofundadas.",
    keyFeatures: [
      "Assistente Financeiro IA (FastAPI + OpenAI + Twilio WhatsApp)",
      "Sincronização bidirecional inteligente de despesas, rendas e metas",
      "Checkout Premium Multi-Gateway (Stripe / Mercado Pago)",
      "Onboarding inteligente e dinâmico (OnboardingWizard)",
      "Gráficos interativos de categorias e fluxo de caixa (Recharts)",
      "Arquitetura escalável em C# .NET 8 com Dapper e PostgreSQL (Supabase)"
    ],

    deployUrl: "https://definance.com.br",
    repoUrl: "https://github.com/nicholasdeway/definance",
  },

  {
    slug: "la-favorita-interior",
    title: "La Favorita Interior",
    description:
      "Landing page institucional premium, moderna e multilíngue desenvolvida para um ateliê de móveis planejados e design de interiores de alto padrão.",
    date: "2026-06-01",
    status: "Ativo",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    complexity: 60,
    stack: {
      frontend: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "Lenis", "i18next", "TypeScript"],
      backend: [],
      database: [],
      infra: ["Vercel"],
    },
    highlights: ["Suporte Multi-idioma (i18n)", "Animações e Rolagem Fluida", "Galeria de Projetos Categorizada"],
    coverImage: "/logo-favorita.png",
    galleryImages: [
      { src: "/favorita/001 - carrossel.png", alt: "Carrossel principal de apresentação (Hero Slider)", caption: "Hero Slider" },
      { src: "/favorita/002 - homepage.png", alt: "Seção principal da página inicial", caption: "Página Inicial" },
      { src: "/favorita/003 - motivo.png", alt: "Seção de diferenciais competitivos e de qualidade", caption: "Diferenciais de Qualidade" },
      { src: "/favorita/004 - experiência.png", alt: "Painel de métricas e anos de experiência da empresa", caption: "Métricas de Experiência" },
      { src: "/favorita/005 - projetos.png", alt: "Galeria com portfólio de projetos realizados", caption: "Portfólio de Projetos" },
      { src: "/favorita/006 - feedback.png", alt: "Seção de avaliações integradas do Google Reviews", caption: "Avaliações do Google" },
      { src: "/favorita/007 - instagram.png", alt: "Galeria integrada de postagens do Instagram", caption: "Galeria do Instagram" },
      { src: "/favorita/008 - contato.png", alt: "Formulário de contato e mapa de localização", caption: "Contato e Localização" },
      { src: "/favorita/009 - sobre.png", alt: "Seção institucional sobre a história da empresa", caption: "Sobre Nós" },
      { src: "/favorita/010 - meta.png", alt: "Seção de perguntas frequentes (FAQ)", caption: "Perguntas Frequentes" },
      { src: "/favorita/011 - blog.png", alt: "Feed de posts e artigos do blog", caption: "Feed do Blog" },
      { src: "/favorita/012 - blog2.png", alt: "Página de visualização interna de artigo do blog", caption: "Página do Artigo" },
      { src: "/favorita/013 - feedback2.png", alt: "Feedbacks detalhados e depoimentos de clientes", caption: "Feedback de Clientes" },
    ],

    summary:
      "Landing page institucional premium com internacionalização (i18n) completa desenvolvida para a La Favorita Interior, empresa líder em fabricação de móveis sob medida, cozinhas premium e closets planejados em Tenerife, Espanha.",
    problemStatement:
      "A La Favorita precisava de um website moderno que refletisse a elegância de seus projetos sob medida de alto padrão, além de se comunicar de maneira clara com o público local e turístico em Tenerife através de suporte multi-idiomas.",
    objectives: [
      "Desenvolver um portal interativo e responsivo focado na exibição dos projetos e acabamentos exclusivos.",
      "Implementar internacionalização (i18n) completa em espanhol e inglês para atender tanto residentes quanto o mercado estrangeiro da ilha.",
      "Criar uma galeria dinâmica com filtros por categoria para segmentar cozinhas, closets, móveis de banheiro e soluções sob medida.",
      "Otimizar a conversão com pontos estratégicos de contato, formulário de orçamento dinâmico e integração com avaliações do Google."
    ],
    targetUsers: "Proprietários de residências em Tenerife interessados em móveis planejados de alta gama, arquitetura de interiores e reformas residenciais exclusivas.",
    keyFeatures: [
      "Layout minimalista e elegante com tipografia refinada",
      "Internacionalização dinâmica utilizando i18next",
      "Animações premium usando Motion e rolagem de alta performance com Lenis",
      "Filtros interativos na galeria de portfólio",
      "Integração visual de depoimentos reais do Google",
    ],

    deployUrl: "https://landing-favorita.vercel.app",
    repoUrl: "https://github.com/nicholasdeway/landing-favorita",
  },
]


export function getProjectBySlug(slug: string): FreelancerProject | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug)
}
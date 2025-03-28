"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

// Define the language context type
type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
  t: (key: string, params?: Record<string, string | number>) => string
  isTranslating: boolean
  supportedLanguages: { code: string; name: string }[]
  translateProductContent: boolean
  setTranslateProductContent: (translate: boolean) => void
}

// Create context with undefined default
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// English translations (default)
const enTranslations = {
  site: {
    name: "ShopName",
    tagline: "Your all-in-one e-commerce solution",
  },
  nav: {
    home: "Home",
    products: "Products",
    categories: "Categories",
    cart: "Cart",
    login: "Login",
    logout: "Logout",
    register: "Register",
    admin_dashboard: "Admin Dashboard",
    deals: "Deals",
    wishlist: "Wishlist",
    account: "Account",
    orders: "Orders",
    settings: "Settings",
    notifications: "Notifications",
    profile: "Profile",
    about: "About",
    contact: "Contact",
    search_placeholder: "Search for products...",
    search: "Search",
    language: "Language",
  },
  buttons: {
    shop_now: "Shop Now",
    browse_categories: "Browse Categories",
    view_all: "View All",
    subscribe: "Subscribe",
    subscribing: "Subscribing...",
    add_to_cart: "Add to Cart",
    buy_now: "Buy Now",
    back_to_home: "Back to Home",
  },
  home: {
    hero_title: "Discover amazing products for your lifestyle",
    hero_subtitle: "Shop the latest trends and find everything you need, all in one place.",
    featured_products: "Featured Products",
    new_arrivals: "New Arrivals",
    shop_by_category: "Shop by Category",
    stay_updated: "Stay Updated",
    newsletter_description:
      "Subscribe to our newsletter to receive updates on new products, special offers, and other discount information.",
    features: {
      free_shipping: "Free Shipping",
      free_shipping_description: "Free shipping on all orders over $50",
      secure_payment: "Secure Payment",
      secure_payment_description: "Your payment information is always secure",
      easy_returns: "Easy Returns",
      easy_returns_description: "30-day money back guarantee",
      support: "24/7 Support",
      support_description: "Our support team is always available to help",
    },
  },
  auth: {
    welcome_back: "Welcome Back",
    sign_in_description: "Sign in to your account to continue",
    email: "Email",
    password: "Password",
    forgot_password: "Forgot Password?",
    remember_me: "Remember me",
    sign_in: "Sign In",
    signing_in: "Signing in...",
    dont_have_account: "Don't have an account?",
    sign_up: "Sign Up",
    google: "Google",
    facebook: "Facebook",
    terms_agreement: "By continuing, you agree to our",
    terms_of_service: "Terms of Service",
    and: "and",
    privacy_policy: "Privacy Policy",
    login_required: "Login Required",
    login_message: "Please login to continue",
    login_now: "Login Now",
    invalid_credentials: "Invalid email or password",
  },
  footer: {
    about_us: "About Us",
    about_description:
      "ShopName offers high-quality products at competitive prices. We are committed to providing an exceptional shopping experience.",
    quick_links: "Quick Links",
    customer_service: "Customer Service",
    newsletter: "Newsletter",
    newsletter_description: "Sign up to receive the latest information about products and promotions",
    email_placeholder: "Your email address",
    subscribe_success: "Subscription successful",
    subscribe_message: "Thank you for subscribing to our newsletter",
    faq: "FAQ",
    shipping: "Shipping",
    returns: "Returns",
    privacy_policy: "Privacy Policy",
    terms_conditions: "Terms & Conditions",
    all_rights_reserved: "All rights reserved",
  },
  cart: {
    title: "Your Cart",
    empty: "Your cart is empty",
    empty_message: "Looks like you haven't added anything to your cart yet",
    browse_products: "Browse Products",
    loading: "Loading cart...",
    redirecting: "Redirecting...",
    login_required: "Login Required",
    login_message: "Please login to view your cart",
    login_now: "Login Now",
    continue_shopping: "Continue Shopping",
    checkout: "Checkout",
    summary: "Order Summary",
    subtotal: "Subtotal",
    tax: "Tax",
    shipping: "Shipping",
    total: "Total",
    itemAdded: "Item Added",
    addedToCart: "has been added to your cart",
    itemRemoved: "Item Removed",
    itemRemovedFromCart: "Item has been removed from your cart",
    quantityUpdated: "Quantity Updated",
    quantityUpdatedTo: "quantity updated to",
    cartCleared: "Cart Cleared",
    allItemRemoved: "All items have been removed from your cart",
    loginRequired: "Login Required",
    loginToAdd: "Please login to add items to your cart",
  },
  errors: {
    title: "Error",
    description: "Something went wrong",
    unknown: "An unknown error occurred",
    tryAgain: "Try Again",
  },
  settings: {
    title: "Settings",
    profile: "Profile",
    language: "Language",
    notifications: "Notifications",
    security: "Security",
    loading: "Loading settings...",
    login_required: "Login Required",
    login_message: "Please login to access your settings",
    login_now: "Login Now",
    language_preferences: "Language Preferences",
    language_description: "Choose your preferred language and translation settings",
    select_language: "Select Language",
    translate_product_content: "Translate Product Content",
    translate_product_content_description: "Automatically translate product names, descriptions, and details",
  },
  common: {
    loading: "Loading",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    next: "Next",
    previous: "Previous",
    added_to_cart: "Added to cart",
  },
  wishlist: {
    login_required: "Login Required",
    login_message: "Please login to access your wishlist",
    item_added: "Item Added",
    added_to_wishlist: "has been added to your wishlist",
    item_removed: "Item Removed",
    removed_from_wishlist: "has been removed from your wishlist",
  },
  product: {
    add_to_wishlist: "Add to Wishlist",
    specifications: "Specifications",
    reviews: "Reviews",
    technical_specs: "Technical Specifications",
    package_contents: "User Manual",
    warranty: "Warranty Card",
    no_reviews: "No Reviews Yet",
    be_first_review: "Be the first to review this product",
    write_review: "Write a Review",
    features: "Features",
    quantity: "Quantity",
    discount: "Save {{amount}}",
    in_stock: "In Stock",
    only_left: "Only {{count}} left in stock",
    out_of_stock: "Out of Stock",
  },
  admin: {
    dashboard: "Admin Dashboard",
    dashboard_description: "Manage your store, products, and customers",
    total_revenue: "Total Revenue",
    revenue_increase: "{{percent}} increase from last month",
    orders: "Orders",
    orders_increase: "{{percent}} increase from last month",
    products: "Products",
    products_increase: "{{count}} new products this week",
    customers: "Customers",
    customers_increase: "{{percent}} increase from last month",
    analytics: "Analytics",
    recent_orders: "Recent Orders",
    manage_orders: "View and manage your store's orders",
    manage_products: "View and manage your store's products",
    manage_customers: "View and manage your store's customers",
    analytics_description: "View your store's performance metrics",
    analytics_dashboard: "Analytics Dashboard",
    analytics_message: "Detailed analytics and reports will be available soon",
    name: "Name",
    category: "Category",
    price: "Price",
    stock: "Stock",
    actions: "Actions",
    add_product: "Add Product",
    search_placeholder: "Search products, orders, or customers...",
    order_id: "Order ID",
    customer: "Customer",
    date: "Date",
    status: "Status",
    total: "Total",
    email: "Email",
    orders_count: "Orders",
    total_spent: "Total Spent",
    login_required: "Login Required",
    login_message: "Please login to access the admin dashboard",
    login: "Login",
    access_denied: "Access Denied",
    no_permission: "You don't have permission to access this page",
    admin_only:
      "This area is restricted to admin users only. Please contact your administrator if you believe this is an error.",
    return_home: "Return to Home",
    admin_login: "Admin Login",
    admin_login_description: "Sign in to access the admin dashboard",
    admin_login_title: "Admin Dashboard Login",
    login_note: "For demo purposes, use admin@example.com / admin123",
    current_user_not_admin: "Your current account does not have admin privileges.",
    status: {
      completed: "Completed",
      processing: "Processing",
      pending: "Pending",
      shipped: "Shipped",
      cancelled: "Cancelled",
    },
    add_product_title: "Add New Product",
    add_product_description: "Create a new product to add to your store",
    product_name: "Product Name",
    product_description: "Product Description",
    product_price: "Price",
    product_stock: "Stock Quantity",
    product_category: "Category",
    product_brand: "Brand",
    product_image: "Product Image",
    product_discount: "Discount (%)",
    product_features: "Features",
    add_feature: "Add Feature",
    save_product: "Save Product",
    cancel: "Cancel",
    product_added: "Product Added",
    product_added_message: "The product has been successfully added to your store",
    required_field: "This field is required",
    upload_image: "Upload Image",
    drag_drop: "Drag and drop an image here, or click to select",
    image_formats: "Supported formats: JPEG, PNG, WebP",
    saving: "Saving",
  },
  language: {
    title: "Language Preferences",
    select: "Select your preferred language",
    product_content: "Translate Product Content",
    translate_products: "Automatically translate product names and descriptions",
    save_preferences: "Save Preferences",
  },
}

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [translateProductContent, setTranslateProductContent] = useState(false)
  const [translations, setTranslations] = useState<Record<string, any>>({
    en: enTranslations,
  })

  // Supported languages
  const supportedLanguages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "th", name: "ไทย" },
  ]

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return

    try {
      // Load language preference
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguageState(storedLanguage)
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split("-")[0]
        if (supportedLanguages.some((lang) => lang.code === browserLang)) {
          setLanguageState(browserLang)
          localStorage.setItem("language", browserLang)
        }
      }

      // Load product translation preference
      const translateProducts = localStorage.getItem("translateProductContent")
      if (translateProducts !== null) {
        setTranslateProductContent(translateProducts === "true")
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [isMounted, supportedLanguages])

  // Function to load translation file dynamically
  const loadTranslation = useCallback(
    async (lang: string) => {
      if (lang === "en" || translations[lang]) {
        return
      }

      setIsTranslating(true)

      try {
        // In a real app, you would fetch translations from an API
        // For this demo, we'll simulate loading with a delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Create a deep copy of English translations as a base
        const mockTranslations = JSON.parse(JSON.stringify(enTranslations))

        // Modify translations based on language
        switch (lang) {
          case "fr":
            // French translations
            mockTranslations.site = {
              name: "NomBoutique",
              tagline: "Votre solution e-commerce tout-en-un",
            }
            mockTranslations.nav = {
              home: "Accueil",
              products: "Produits",
              categories: "Catégories",
              cart: "Panier",
              login: "Connexion",
              logout: "Déconnexion",
              register: "S'inscrire",
              admin_dashboard: "Tableau de bord",
              deals: "Offres",
              wishlist: "Liste de souhaits",
              account: "Compte",
              orders: "Commandes",
              settings: "Paramètres",
              search_placeholder: "Rechercher des produits...",
              search: "Rechercher",
              language: "Langue",
              notifications: "Notifications",
              profile: "Profil",
              about: "À propos",
              contact: "Contact",
            }
            mockTranslations.buttons = {
              shop_now: "Acheter maintenant",
              browse_categories: "Parcourir les catégories",
              view_all: "Voir tout",
              subscribe: "S'abonner",
              subscribing: "Abonnement...",
              add_to_cart: "Ajouter au panier",
              buy_now: "Acheter maintenant",
            }
            mockTranslations.home = {
              hero_title: "Découvrez des produits incroyables pour votre style de vie",
              hero_subtitle:
                "Achetez les dernières tendances et trouvez tout ce dont vous avez besoin, en un seul endroit.",
              featured_products: "Produits en vedette",
              new_arrivals: "Nouveautés",
              shop_by_category: "Acheter par catégorie",
              stay_updated: "Restez informé",
              newsletter_description:
                "Abonnez-vous à notre newsletter pour recevoir des mises à jour sur les nouveaux produits, les offres spéciales et autres informations de réduction.",
              features: {
                free_shipping: "Livraison gratuite",
                free_shipping_description: "Livraison gratuite sur toutes les commandes de plus de 50€",
                secure_payment: "Paiement sécurisé",
                secure_payment_description: "Vos informations de paiement sont toujours sécurisées",
                easy_returns: "Retours faciles",
                easy_returns_description: "Garantie de remboursement de 30 jours",
                support: "Support 24/7",
                support_description: "Notre équipe de support est toujours disponible pour vous aider",
              },
            }
            mockTranslations.auth = {
              welcome_back: "Bon retour",
              sign_in_description: "Connectez-vous à votre compte pour continuer",
              email: "Email",
              password: "Mot de passe",
              forgot_password: "Mot de passe oublié ?",
              remember_me: "Se souvenir de moi",
              sign_in: "Se connecter",
              signing_in: "Connexion en cours...",
              dont_have_account: "Vous n'avez pas de compte ?",
              sign_up: "S'inscrire",
              google: "Google",
              facebook: "Facebook",
              terms_agreement: "En continuant, vous acceptez nos",
              terms_of_service: "Conditions d'utilisation",
              and: "et",
              privacy_policy: "Politique de confidentialité",
              login_required: "Connexion requise",
              login_message: "Veuillez vous connecter pour continuer",
              login_now: "Se connecter maintenant",
              login_to_add: "Veuillez vous connecter pour ajouter des articles à votre panier",
              invalid_credentials: "Email ou mot de passe invalide",
            }
            mockTranslations.footer = {
              about_us: "À propos de nous",
              about_description:
                "NomBoutique propose des produits de haute qualité à des prix compétitifs. Nous nous engageons à offrir une expérience d'achat exceptionnelle.",
              quick_links: "Liens rapides",
              customer_service: "Service client",
              newsletter: "Newsletter",
              newsletter_description:
                "Inscrivez-vous pour recevoir les dernières informations sur les produits et les promotions",
              email_placeholder: "Votre adresse email",
              subscribe_success: "Abonnement réussi",
              subscribe_message: "Merci de vous être abonné à notre newsletter",
              faq: "FAQ",
              shipping: "Livraison",
              returns: "Retours",
              privacy_policy: "Politique de confidentialité",
              terms_conditions: "Conditions générales",
              all_rights_reserved: "Tous droits réservés",
            }
            mockTranslations.product = {
              add_to_wishlist: "Ajouter à la liste de souhaits",
              specifications: "Spécifications",
              reviews: "Avis",
              technical_specs: "Spécifications techniques",
              package_contents: "Manuel d'utilisation",
              warranty: "Carte de garantie",
              no_reviews: "Pas encore d'avis",
              be_first_review: "Soyez le premier à donner votre avis sur ce produit",
              write_review: "Écrire un avis",
              features: "Caractéristiques",
              quantity: "Quantité",
              discount: "Économisez {{amount}}",
              in_stock: "En stock",
              only_left: "Plus que {{count}} en stock",
              out_of_stock: "Rupture de stock",
            }

            mockTranslations.admin = {
              dashboard: "Tableau de bord d'administration",
              dashboard_description: "Gérez votre boutique, vos produits et vos clients",
              total_revenue: "Revenu total",
              revenue_increase: "{{percent}} d'augmentation par rapport au mois dernier",
              orders: "Commandes",
              orders_increase: "{{percent}} d'augmentation par rapport au mois dernier",
              products: "Produits",
              products_increase: "{{count}} nouveaux produits cette semaine",
              customers: "Clients",
              customers_increase: "{{percent}} d'augmentation par rapport au mois dernier",
              analytics: "Analyses",
              recent_orders: "Commandes récentes",
              manage_orders: "Consultez et gérez les commandes de votre boutique",
              manage_products: "Consultez et gérez les produits de votre boutique",
              manage_customers: "Consultez et gérez les clients de votre boutique",
              analytics_description: "Consultez les indicateurs de performance de votre boutique",
              analytics_dashboard: "Tableau de bord d'analyse",
              analytics_message: "Des analyses et rapports détaillés seront bientôt disponibles",
              name: "Nom",
              category: "Catégorie",
              price: "Prix",
              stock: "Stock",
              actions: "Actions",
              add_product: "Ajouter un produit",
              search_placeholder: "Rechercher des produits, commandes ou clients...",
              order_id: "ID de commande",
              customer: "Client",
              date: "Date",
              status: "Statut",
              total: "Total",
              email: "Email",
              orders_count: "Commandes",
              total_spent: "Total dépensé",
              login_required: "Connexion requise",
              login_message: "Veuillez vous connecter pour accéder au tableau de bord d'administration",
              login: "Connexion",
              access_denied: "Accès refusé",
              no_permission: "Vous n'avez pas la permission d'accéder à cette page",
              admin_only:
                "Cette zone est réservée aux administrateurs. Veuillez contacter votre administrateur si vous pensez qu'il s'agit d'une erreur.",
              return_home: "Retour à l'accueil",
              admin_login: "Connexion administrateur",
              admin_login_description: "Connectez-vous pour accéder au tableau de bord d'administration",
              admin_login_title: "Connexion au tableau de bord d'administration",
              login_note: "À des fins de démonstration, utilisez admin@example.com / admin123",
              current_user_not_admin: "Votre compte actuel n'a pas de privilèges d'administrateur.",
              status: {
                completed: "Terminée",
                processing: "En traitement",
                pending: "En attente",
                shipped: "Expédiée",
                cancelled: "Annulée",
              },
              add_product_title: "Ajouter un nouveau produit",
              add_product_description: "Créez un nouveau produit à ajouter à votre boutique",
              product_name: "Nom du produit",
              product_description: "Description du produit",
              product_price: "Prix",
              product_stock: "Quantité en stock",
              product_category: "Catégorie",
              product_brand: "Marque",
              product_image: "Image du produit",
              product_discount: "Remise (%)",
              product_features: "Caractéristiques",
              add_feature: "Ajouter une caractéristique",
              save_product: "Enregistrer le produit",
              cancel: "Annuler",
              product_added: "Produit ajouté",
              product_added_message: "Le produit a été ajouté avec succès à votre boutique",
              required_field: "Ce champ est obligatoire",
              upload_image: "Télécharger une image",
              drag_drop: "Glissez et déposez une image ici, ou cliquez pour sélectionner",
              image_formats: "Formats pris en charge: JPEG, PNG, WebP",
              saving: "Enregistrement",
            }
            break

          case "es":
            // Spanish translations
            mockTranslations.site = {
              name: "NombreTienda",
              tagline: "Su solución de comercio electrónico todo en uno",
            }
            mockTranslations.nav = {
              home: "Inicio",
              products: "Productos",
              categories: "Categorías",
              cart: "Carrito",
              login: "Iniciar sesión",
              logout: "Cerrar sesión",
              register: "Registrarse",
              admin_dashboard: "Panel de administración",
              deals: "Ofertas",
              wishlist: "Lista de deseos",
              account: "Cuenta",
              orders: "Pedidos",
              settings: "Configuración",
              search_placeholder: "Buscar productos...",
              search: "Buscar",
              language: "Idioma",
              notifications: "Notificaciones",
              profile: "Perfil",
              about: "Acerca de",
              contact: "Contacto",
            }
            mockTranslations.buttons = {
              shop_now: "Comprar ahora",
              browse_categories: "Explorar categorías",
              view_all: "Ver todo",
              subscribe: "Suscribirse",
              subscribing: "Suscribiendo...",
              add_to_cart: "Añadir al carrito",
              buy_now: "Comprar ahora",
              back_to_home: "Volver al inicio",
            }
            mockTranslations.home = {
              hero_title: "Descubra productos increíbles para su estilo de vida",
              hero_subtitle: "Compre las últimas tendencias y encuentre todo lo que necesita, todo en un solo lugar.",
              featured_products: "Productos destacados",
              new_arrivals: "Novedades",
              shop_by_category: "Comprar por categoría",
              stay_updated: "Manténgase actualizado",
              newsletter_description:
                "Suscríbase a nuestro boletín para recibir actualizaciones sobre nuevos productos, ofertas especiales y otra información de descuentos.",
              features: {
                free_shipping: "Envío gratuito",
                free_shipping_description: "Envío gratuito en todos los pedidos superiores a 50€",
                secure_payment: "Pago seguro",
                secure_payment_description: "Su información de pago siempre está segura",
                easy_returns: "Devoluciones fáciles",
                easy_returns_description: "Garantía de devolución de dinero de 30 días",
                support: "Soporte 24/7",
                support_description: "Nuestro equipo de soporte siempre está disponible para ayudar",
              },
            }
            mockTranslations.auth = {
              welcome_back: "Bienvenido de nuevo",
              sign_in_description: "Inicie sesión en su cuenta para continuar",
              email: "Correo electrónico",
              password: "Contraseña",
              forgot_password: "¿Olvidó su contraseña?",
              remember_me: "Recordarme",
              sign_in: "Iniciar sesión",
              signing_in: "Iniciando sesión...",
              dont_have_account: "¿No tiene una cuenta?",
              sign_up: "Registrarse",
              google: "Google",
              facebook: "Facebook",
              terms_agreement: "Al continuar, acepta nuestros",
              terms_of_service: "Términos de servicio",
              and: "y",
              privacy_policy: "Política de privacidad",
              login_required: "Inicio de sesión requerido",
              login_message: "Por favor, inicie sesión para continuar",
              login_now: "Iniciar sesión ahora",
              login_to_add: "Por favor, inicie sesión para añadir artículos a su carrito",
              invalid_credentials: "Correo electrónico o contraseña inválidos",
            }
            mockTranslations.footer = {
              about_us: "Sobre nosotros",
              about_description:
                "NombreTienda ofrece productos de alta calidad a precios competitivos. Nos comprometemos a brindar una experiencia de compra excepcional.",
              quick_links: "Enlaces rápidos",
              customer_service: "Servicio al cliente",
              newsletter: "Boletín",
              newsletter_description:
                "Suscríbase para recibir la información más reciente sobre productos y promociones",
              email_placeholder: "Su dirección de correo electrónico",
              subscribe_success: "Suscripción exitosa",
              subscribe_message: "Gracias por suscribirse a nuestro boletín",
              faq: "Preguntas frecuentes",
              shipping: "Envío",
              returns: "Devoluciones",
              privacy_policy: "Política de privacidad",
              terms_conditions: "Términos y condiciones",
              all_rights_reserved: "Todos los derechos reservados",
            }
            mockTranslations.product = {
              add_to_wishlist: "Añadir a la lista de deseos",
              specifications: "Especificaciones",
              reviews: "Reseñas",
              technical_specs: "Especificaciones técnicas",
              package_contents: "Manual de usuario",
              warranty: "Tarjeta de garantía",
              no_reviews: "Aún no hay reseñas",
              be_first_review: "Sea el primero en dejar una reseña de este producto",
              write_review: "Escribir una reseña",
              features: "Características",
              quantity: "Cantidad",
              discount: "Ahorre {{amount}}",
              in_stock: "En stock",
              only_left: "Solo quedan {{count}} en stock",
              out_of_stock: "Agotado",
            }
            mockTranslations.admin = {
              dashboard: "Panel de administración",
              dashboard_description: "Administre su tienda, productos y clientes",
              total_revenue: "Ingresos totales",
              revenue_increase: "{{percent}} de aumento respecto al mes pasado",
              orders: "Pedidos",
              orders_increase: "{{percent}} de aumento respecto al mes pasado",
              products: "Productos",
              products_increase: "{{count}} nuevos productos esta semana",
              customers: "Clientes",
              customers_increase: "{{percent}} de aumento respecto al mes pasado",
              analytics: "Análisis",
              recent_orders: "Pedidos recientes",
              manage_orders: "Ver y gestionar los pedidos de su tienda",
              manage_products: "Ver y gestionar los productos de su tienda",
              manage_customers: "Ver y gestionar los clientes de su tienda",
              analytics_description: "Ver las métricas de rendimiento de su tienda",
              analytics_dashboard: "Panel de análisis",
              analytics_message: "Los análisis e informes detallados estarán disponibles pronto",
              name: "Nombre",
              category: "Categoría",
              price: "Precio",
              stock: "Stock",
              actions: "Acciones",
              add_product: "Añadir producto",
              search_placeholder: "Buscar productos, pedidos o clientes...",
              order_id: "ID de pedido",
              customer: "Cliente",
              date: "Fecha",
              status: "Estado",
              total: "Total",
              email: "Correo electrónico",
              orders_count: "Pedidos",
              total_spent: "Gasto total",
              login_required: "Inicio de sesión requerido",
              login_message: "Por favor, inicie sesión para acceder al panel de administración",
              login: "Iniciar sesión",
              access_denied: "Acceso denegado",
              no_permission: "No tiene permiso para acceder a esta página",
              admin_only:
                "Esta área está restringida solo a usuarios administradores. Póngase en contacto con su administrador si cree que esto es un error.",
              return_home: "Volver al inicio",
              admin_login: "Inicio de sesión de administrador",
              admin_login_description: "Inicie sesión para acceder al panel de administración",
              admin_login_title: "Inicio de sesión del panel de administración",
              login_note: "Para fines de demostración, use admin@example.com / admin123",
              current_user_not_admin: "Su cuenta actual no tiene privilegios de administrador.",
              status: {
                completed: "Completado",
                processing: "Procesando",
                pending: "Pendiente",
                shipped: "Enviado",
                cancelled: "Cancelado",
              },
              add_product_title: "Añadir nuevo producto",
              add_product_description: "Cree un nuevo producto para añadir a su tienda",
              product_name: "Nombre del producto",
              product_description: "Descripción del producto",
              product_price: "Precio",
              product_stock: "Cantidad en stock",
              product_category: "Categoría",
              product_brand: "Marca",
              product_image: "Imagen del producto",
              product_discount: "Descuento (%)",
              product_features: "Características",
              add_feature: "Añadir característica",
              save_product: "Guardar producto",
              cancel: "Cancelar",
              product_added: "Producto añadido",
              product_added_message: "El producto se ha añadido correctamente a su tienda",
              required_field: "Este campo es obligatorio",
              upload_image: "Subir imagen",
              drag_drop: "Arrastre y suelte una imagen aquí, o haga clic para seleccionar",
              image_formats: "Formatos soportados: JPEG, PNG, WebP",
              saving: "Guardando",
            }
            break

          case "de":
            // German translations
            mockTranslations.site = {
              name: "Shopname",
              tagline: "Ihre All-in-One-E-Commerce-Lösung",
            }
            mockTranslations.nav = {
              home: "Startseite",
              products: "Produkte",
              categories: "Kategorien",
              cart: "Warenkorb",
              login: "Anmelden",
              logout: "Abmelden",
              register: "Registrieren",
              admin_dashboard: "Admin-Dashboard",
              deals: "Angebote",
            }
            mockTranslations.buttons = {
              shop_now: "Jetzt einkaufen",
              browse_categories: "Kategorien durchsuchen",
              view_all: "Alle anzeigen",
              subscribe: "Abonnieren",
              subscribing: "Abonniere...",
              add_to_cart: "In den Warenkorb",
              buy_now: "Jetzt kaufen",
            }
            mockTranslations.footer = {
              about_us: "Über uns",
              about_description:
                "Shopname bietet hochwertige Produkte zu wettbewerbsfähigen Preisen. Wir sind bestrebt, ein außergewöhnliches Einkaufserlebnis zu bieten.",
              quick_links: "Schnelllinks",
              customer_service: "Kundenservice",
              faq: "Häufig gestellte Fragen",
              shipping: "Versand",
              returns: "Rückgabe",
              privacy_policy: "Datenschutzrichtlinie",
              terms_conditions: "Allgemeine Geschäftsbedingungen",
              all_rights_reserved: "Alle Rechte vorbehalten",
            }
            break

          case "vi":
            // Vietnamese translations
            mockTranslations.site = {
              name: "Cửa Hàng",
              tagline: "Giải pháp thương mại điện tử toàn diện",
            }
            mockTranslations.nav = {
              home: "Trang chủ",
              products: "Sản phẩm",
              categories: "Danh mục",
              cart: "Giỏ hàng",
              login: "Đăng nhập",
              logout: "Đăng xuất",
              register: "Đăng ký",
              admin_dashboard: "Quản trị viên",
              deals: "Khuyến mãi",
              wishlist: "Danh sách yêu thích",
              account: "Tài khoản",
              orders: "Đơn hàng",
              settings: "Cài đặt",
              search_placeholder: "Tìm kiếm sản phẩm...",
              search: "Tìm kiếm",
              language: "Ngôn ngữ",
              notifications: "Thông báo",
              profile: "Hồ sơ",
              about: "Giới thiệu",
              contact: "Liên hệ",
            }
            mockTranslations.buttons = {
              shop_now: "Mua ngay",
              browse_categories: "Xem danh mục",
              view_all: "Xem tất cả",
              subscribe: "Đăng ký",
              subscribing: "Đang đăng ký...",
              add_to_cart: "Thêm vào giỏ",
              buy_now: "Mua ngay",
            }
            mockTranslations.home = {
              hero_title: "Khám phá những sản phẩm tuyệt vời cho phong cách sống của bạn",
              hero_subtitle: "Mua sắm các xu hướng mới nhất và tìm thấy mọi thứ bạn cần, tất cả trong một nơi.",
              featured_products: "Sản phẩm nổi bật",
              new_arrivals: "Hàng mới về",
              shop_by_category: "Mua sắm theo danh mục",
              stay_updated: "Cập nhật thông tin",
              newsletter_description:
                "Đăng ký nhận bản tin của chúng tôi để nhận thông tin cập nhật về sản phẩm mới, ưu đãi đặc biệt và thông tin giảm giá khác.",
              features: {
                free_shipping: "Miễn phí vận chuyển",
                free_shipping_description: "Miễn phí vận chuyển cho tất cả đơn hàng trên 50$",
                secure_payment: "Thanh toán an toàn",
                secure_payment_description: "Thông tin thanh toán của bạn luôn được bảo mật",
                easy_returns: "Dễ dàng đổi trả",
                easy_returns_description: "Đảm bảo hoàn tiền trong 30 ngày",
                support: "Hỗ trợ 24/7",
                support_description: "Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn",
              },
            }
            mockTranslations.auth = {
              welcome_back: "Chào mừng trở lại",
              sign_in_description: "Đăng nhập vào tài khoản của bạn để tiếp tục",
              email: "Email",
              password: "Mật khẩu",
              forgot_password: "Quên mật khẩu?",
              remember_me: "Ghi nhớ đăng nhập",
              sign_in: "Đăng nhập",
              signing_in: "Đang đăng nhập...",
              dont_have_account: "Bạn chưa có tài khoản?",
              sign_up: "Đăng ký",
              google: "Google",
              facebook: "Facebook",
              terms_agreement: "Bằng cách tiếp tục, bạn đồng ý với",
              terms_of_service: "Điều khoản dịch vụ",
              and: "và",
              privacy_policy: "Chính sách bảo mật",
              login_required: "Yêu cầu đăng nhập",
              login_message: "Vui lòng đăng nhập để tiếp tục",
              login_now: "Đăng nhập ngay",
              login_to_add: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
              invalid_credentials: "Email hoặc mật khẩu không hợp lệ",
            }
            mockTranslations.footer = {
              about_us: "Về chúng tôi",
              about_description:
                "Cửa Hàng cung cấp các sản phẩm chất lượng cao với giá cả cạnh tranh. Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời cho khách hàng.",
              quick_links: "Liên kết nhanh",
              customer_service: "Dịch vụ khách hàng",
              newsletter: "Bản tin",
              newsletter_description: "Đăng ký để nhận thông tin mới nhất về sản phẩm và khuyến mãi",
              email_placeholder: "Địa chỉ email của bạn",
              subscribe_success: "Đăng ký thành công",
              subscribe_message: "Cảm ơn bạn đã đăng ký nhận bản tin của chúng tôi",
              faq: "Câu hỏi thường gặp",
              shipping: "Chính sách vận chuyển",
              returns: "Chính sách đổi trả",
              privacy_policy: "Chính sách bảo mật",
              terms_conditions: "Điều khoản & Điều kiện",
              all_rights_reserved: "Tất cả các quyền được bảo lưu",
            }

            mockTranslations.product = {
              add_to_wishlist: "Thêm vào danh sách yêu thích",
              specifications: "Thông số kỹ thuật",
              reviews: "Đánh giá",
              technical_specs: "Thông số kỹ thuật chi tiết",
              package_contents: "Hướng dẫn sử dụng",
              warranty: "Phiếu bảo hành",
              no_reviews: "Chưa có đánh giá nào",
              be_first_review: "Hãy là người đầu tiên đánh giá sản phẩm này",
              write_review: "Viết đánh giá",
              features: "Tính năng",
              quantity: "Số lượng",
              discount: "Tiết kiệm {{amount}}",
              in_stock: "Còn hàng",
              only_left: "Chỉ còn {{count}} sản phẩm",
              out_of_stock: "Hết hàng",
            }

            mockTranslations.admin = {
              dashboard: "Bảng điều khiển quản trị",
              dashboard_description: "Quản lý cửa hàng, sản phẩm và khách hàng của bạn",
              total_revenue: "Tổng doanh thu",
              revenue_increase: "Tăng {{percent}} so với tháng trước",
              orders: "Đơn hàng",
              orders_increase: "Tăng {{percent}} so với tháng trước",
              products: "Sản phẩm",
              products_increase: "{{count}} sản phẩm mới trong tuần này",
              customers: "Khách hàng",
              customers_increase: "Tăng {{percent}} so với tháng trước",
              analytics: "Phân tích",
              recent_orders: "Đơn hàng gần đây",
              manage_orders: "Xem và quản lý đơn hàng của cửa hàng",
              manage_products: "Xem và quản lý sản phẩm của cửa hàng",
              manage_customers: "Xem và quản lý khách hàng của cửa hàng",
              analytics_description: "Xem các chỉ số hiệu suất của cửa hàng",
              analytics_dashboard: "Bảng điều khiển phân tích",
              analytics_message: "Phân tích và báo cáo chi tiết sẽ sớm được cung cấp",
              name: "Tên",
              category: "Danh mục",
              price: "Giá",
              stock: "Kho",
              actions: "Hành động",
              add_product: "Thêm sản phẩm",
              search_placeholder: "Tìm kiếm sản phẩm, đơn hàng hoặc khách hàng...",
              order_id: "Mã đơn hàng",
              customer: "Khách hàng",
              date: "Ngày",
              status: "Trạng thái",
              total: "Tổng cộng",
              email: "Email",
              orders_count: "Đơn hàng",
              total_spent: "Tổng chi tiêu",
              login_required: "Yêu cầu đăng nhập",
              login_message: "Vui lòng đăng nhập để truy cập bảng điều khiển quản trị",
              login: "Đăng nhập",
              access_denied: "Từ chối truy cập",
              no_permission: "Bạn không có quyền truy cập trang này",
              admin_only:
                "Khu vực này chỉ dành cho quản trị viên. Vui lòng liên hệ với quản trị viên nếu bạn cho rằng đây là lỗi.",
              return_home: "Quay lại trang chủ",
              admin_login: "Đăng nhập quản trị",
              admin_login_description: "Đăng nhập để truy cập bảng điều khiển quản trị",
              admin_login_title: "Đăng nhập bảng điều khiển quản trị",
              login_note: "Cho mục đích demo, sử dụng admin@example.com / admin123",
              current_user_not_admin: "Tài khoản hiện tại của bạn không có quyền quản trị viên.",
              status: {
                completed: "Hoàn thành",
                processing: "Đang xử lý",
                pending: "Chờ xử lý",
                shipped: "Đã gửi hàng",
                cancelled: "Đã hủy",
              },
              add_product_title: "Thêm sản phẩm mới",
              add_product_description: "Tạo sản phẩm mới để thêm vào cửa hàng của bạn",
              product_name: "Tên sản phẩm",
              product_description: "Mô tả sản phẩm",
              product_price: "Giá",
              product_stock: "Số lượng trong kho",
              product_category: "Danh mục",
              product_brand: "Thương hiệu",
              product_image: "Hình ảnh sản phẩm",
              product_discount: "Giảm giá (%)",
              product_features: "Tính năng",
              add_feature: "Thêm tính năng",
              save_product: "Lưu sản phẩm",
              cancel: "Hủy",
              product_added: "Đã thêm sản phẩm",
              product_added_message: "Sản phẩm đã được thêm thành công vào cửa hàng của bạn",
              required_field: "Trường này là bắt buộc",
              upload_image: "Tải lên hình ảnh",
              drag_drop: "Kéo và thả hình ảnh vào đây, hoặc nhấp để chọn",
              image_formats: "Định dạng hỗ trợ: JPEG, PNG, WebP",
              saving: "Đang lưu",
            }
            break

          case "zh":
            // Chinese translations
            mockTranslations.site = {
              name: "商店名称",
              tagline: "您的一站式电子商务解决方案",
            }
            mockTranslations.nav = {
              home: "首页",
              products: "产品",
              categories: "类别",
              cart: "购物车",
              login: "登录",
              logout: "登出",
              register: "注册",
              admin_dashboard: "管理仪表板",
              deals: "优惠",
            }
            mockTranslations.buttons = {
              shop_now: "立即购买",
              browse_categories: "浏览类别",
              view_all: "查看全部",
              subscribe: "订阅",
              subscribing: "订阅中...",
              add_to_cart: "加入购物车",
              buy_now: "立即购买",
            }
            mockTranslations.footer = {
              about_us: "关于我们",
              about_description: "商店名称提供高质量的产品，价格具有竞争力。我们致力于为客户提供卓越的购物体验。",
              quick_links: "快速链接",
              customer_service: "客户服务",
              faq: "常见问题",
              shipping: "配送政策",
              returns: "退货政策",
              privacy_policy: "隐私政策",
              terms_conditions: "条款和条件",
              all_rights_reserved: "保留所有权利",
            }
            break

          case "ja":
            // Japanese translations
            mockTranslations.site = {
              name: "ショップ名",
              tagline: "ワンストップEコマースソリューション",
            }
            mockTranslations.nav = {
              home: "ホーム",
              products: "製品",
              categories: "カテゴリー",
              cart: "カート",
              login: "ログイン",
              logout: "ログアウト",
              register: "登録",
              admin_dashboard: "管理ダッシュボード",
              deals: "お得な情報",
            }
            mockTranslations.buttons = {
              shop_now: "今すぐ購入",
              browse_categories: "カテゴリーを閲覧",
              view_all: "すべて表示",
              subscribe: "購読する",
              subscribing: "購読中...",
              add_to_cart: "カートに追加",
              buy_now: "今すぐ購入",
            }
            mockTranslations.footer = {
              about_us: "会社概要",
              about_description:
                "ショップ名は、競争力のある価格で高品質の製品を提供しています。私たちは、お客様に優れたショッピング体験を提供することをお約束します。",
              quick_links: "クイックリンク",
              customer_service: "カスタマーサービス",
              faq: "よくある質問",
              shipping: "配送ポリシー",
              returns: "返品ポリシー",
              privacy_policy: "プライバシーポリシー",
              terms_conditions: "利用規約",
              all_rights_reserved: "全著作権所有",
            }
            break

          case "ko":
            // Korean translations
            mockTranslations.site = {
              name: "상점 이름",
              tagline: "원스톱 전자상거래 솔루션",
            }
            mockTranslations.nav = {
              home: "홈",
              products: "제품",
              categories: "카테고리",
              cart: "장바구니",
              login: "로그인",
              logout: "로그아웃",
              register: "등록",
              admin_dashboard: "관리자 대시보드",
              deals: "할인",
            }
            mockTranslations.buttons = {
              shop_now: "지금 쇼핑하기",
              browse_categories: "카테고리 둘러보기",
              view_all: "모두 보기",
              subscribe: "구독하기",
              subscribing: "구독 중...",
              add_to_cart: "장바구니에 추가",
              buy_now: "지금 구매",
            }
            mockTranslations.footer = {
              about_us: "회사 소개",
              about_description:
                "상점 이름은 경쟁력 있는 가격으로 고품질 제품을 제공합니다. 우리는 고객에게 탁월한 쇼핑 경험을 제공하기 위해 최선을 다하고 있습니다.",
              quick_links: "빠른 링크",
              customer_service: "고객 서비스",
              faq: "자주 묻는 질문",
              shipping: "배송 정책",
              returns: "반품 정책",
              privacy_policy: "개인정보 보호정책",
              terms_conditions: "이용약관",
              all_rights_reserved: "모든 권리 보유",
            }
            break

          case "th":
            // Thai translations
            mockTranslations.site = {
              name: "ชื่อร้านค้า",
              tagline: "โซลูชันอีคอมเมิร์ซครบวงจร",
            }
            mockTranslations.nav = {
              home: "หน้าแรก",
              products: "สินค้า",
              categories: "หมวดหมู่",
              cart: "ตะกร้าสินค้า",
              login: "เข้าสู่ระบบ",
              logout: "ออกจากระบบ",
              register: "ลงทะเบียน",
              admin_dashboard: "แดชบอร์ดผู้ดูแลระบบ",
              deals: "โปรโมชั่น",
            }
            mockTranslations.buttons = {
              shop_now: "ซื้อเลย",
              browse_categories: "ดูหมวดหมู่",
              view_all: "ดูทั้งหมด",
              subscribe: "สมัครรับข่าวสาร",
              subscribing: "กำลังสมัคร...",
              add_to_cart: "เพิ่มลงตะกร้า",
              buy_now: "ซื้อเลย",
            }
            mockTranslations.footer = {
              about_us: "เกี่ยวกับเรา",
              about_description:
                "ชื่อร้านค้าให้บริการสินค้าคุณภาพสูงในราคาที่แข่งขันได้ เรามุ่งมั่นที่จะมอบประสบการณ์การช้อปปิ้งที่ยอดเยี่ยมให้กับลูกค้า",
              quick_links: "ลิงก์ด่วน",
              customer_service: "บริการลูกค้า",
              faq: "คำถามที่พบบ่อย",
              shipping: "นโยบายการจัดส่ง",
              returns: "นโยบายการคืนสินค้า",
              privacy_policy: "นโยบายความเป็นส่วนตัว",
              terms_conditions: "ข้อกำหนดและเงื่อนไข",
              all_rights_reserved: "สงวนลิขสิทธิ์ทั้งหมด",
            }
            break
        }

        // Update translations with new language
        setTranslations((prev) => ({
          ...prev,
          [lang]: mockTranslations,
        }))
      } catch (error) {
        console.error(`Failed to load ${lang} translations:`, error)
        // Fallback to English on error
      } finally {
        setIsTranslating(false)
      }
    },
    [translations],
  )

  // Set language and save to localStorage, then trigger translation loading
  const setLanguage = useCallback(
    (lang: string) => {
      if (!isMounted) return

      setLanguageState(lang)
      try {
        localStorage.setItem("language", lang)
      } catch (error) {
        console.error("Error saving language preference:", error)
      }

      // Load translation if not already in cache
      if (lang !== "en" && !translations[lang]) {
        loadTranslation(lang)
      }
    },
    [translations, loadTranslation, isMounted],
  )

  // Save product translation preference
  const handleSetTranslateProductContent = useCallback((translate: boolean) => {
    setTranslateProductContent(translate)
    try {
      localStorage.setItem("translateProductContent", translate.toString())
    } catch (error) {
      console.error("Error saving product translation preference:", error)
    }
  }, [])

  // Trigger translation loading when language changes
  useEffect(() => {
    if (!isMounted) return

    if (language !== "en" && !translations[language]) {
      loadTranslation(language)
    }
  }, [language, translations, loadTranslation, isMounted])

  // Translation function with parameter support
  const t = useCallback(
    (key: string, params?: Record<string, string | number> & { fallback?: string }) => {
      if (!isMounted) return key

      // Check if this is a product content key that should not be translated
      if (
        !translateProductContent &&
        (key.startsWith("product.name.") ||
          key.startsWith("product.description.") ||
          key.startsWith("product.details."))
      ) {
        // Return the original content without translation
        return params?.fallback || key.split(".").slice(2).join(".")
      }

      // Split the key by dots to access nested properties
      const keys = key.split(".")

      // Get the translations for the current language
      const currentTranslations = translations[language] || enTranslations

      // Navigate through the nested objects to find the translation
      let result: any = currentTranslations

      try {
        for (const k of keys) {
          if (result && typeof result === "object" && k in result) {
            result = result[k]
          } else {
            // If key not found in current language, try English
            if (language !== "en") {
              let fallback: any = enTranslations
              for (const fk of keys) {
                if (fallback && typeof fallback === "object" && fk in fallback) {
                  fallback = fallback[fk]
                } else {
                  // Return fallback or key itself if not found in English either
                  return params?.fallback || key
                }
              }
              return typeof fallback === "string" ? replaceParams(fallback, params) : params?.fallback || key
            }
            return params?.fallback || key // Return fallback or key itself if not found
          }
        }

        return typeof result === "string" ? replaceParams(result, params) : params?.fallback || key
      } catch (error) {
        console.error(`Translation error for key: ${key}`, error)
        return params?.fallback || key // Return fallback or key itself if there's an error
      }
    },
    [language, translations, isMounted, translateProductContent],
  )

  // Helper function to replace parameters in translation strings
  const replaceParams = (text: string, params?: Record<string, string | number> & { fallback?: string }) => {
    if (!params) return text

    // Tạo bản sao của params mà không có thuộc tính fallback
    const { fallback, ...actualParams } = params as any

    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return actualParams[key]?.toString() || `{{${key}}}`
    })
  }

  // Context value
  const value = {
    language,
    setLanguage,
    t,
    isTranslating,
    supportedLanguages,
    translateProductContent,
    setTranslateProductContent: handleSetTranslateProductContent,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Client-safe component to prevent hydration errors
export function ClientSafeComponent({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Return a minimal placeholder during server-side rendering
    return <div aria-hidden="true"></div>
  }

  return <>{children}</>
}


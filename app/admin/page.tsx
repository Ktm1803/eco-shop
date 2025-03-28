"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Loader2,
  Search,
  Plus,
  Edit,
  Trash2,
  LogIn,
  Lock,
} from "lucide-react"
import { ClientSafeComponent } from "@/components/client-safe-component"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { AdminAddProduct } from "@/components/admin-add-product"

// Sample data
const orders = [
  { id: "ORD-1234", customer: "John Doe", date: "2023-03-15", status: "completed", total: 349.99 },
  { id: "ORD-1235", customer: "Jane Smith", date: "2023-03-16", status: "processing", total: 129.5 },
  { id: "ORD-1236", customer: "Robert Johnson", date: "2023-03-16", status: "pending", total: 79.99 },
  { id: "ORD-1237", customer: "Emily Davis", date: "2023-03-17", status: "shipped", total: 199.99 },
  { id: "ORD-1238", customer: "Michael Brown", date: "2023-03-18", status: "cancelled", total: 59.99 },
]

const products = [
  { id: "1", name: "Sony WH-1000XM4 Headphones", category: "Electronics", price: 349.99, stock: 15 },
  { id: "2", name: "Samsung Galaxy S21 Ultra", category: "Electronics", price: 1199.99, stock: 8 },
  { id: "3", name: "Apple MacBook Pro 16-inch", category: "Electronics", price: 2399.99, stock: 5 },
  { id: "4", name: "Bose QuietComfort Earbuds", category: "Electronics", price: 279.99, stock: 12 },
  { id: "5", name: "Anker Wireless Charging Pad", category: "Electronics", price: 29.99, stock: 30 },
]

const customers = [
  { id: "1", name: "John Doe", email: "john@example.com", orders: 5, spent: 749.95 },
  { id: "2", name: "Jane Smith", email: "jane@example.com", orders: 3, spent: 429.97 },
  { id: "3", name: "Robert Johnson", email: "robert@example.com", orders: 1, spent: 79.99 },
  { id: "4", name: "Emily Davis", email: "emily@example.com", orders: 2, spent: 259.98 },
  { id: "5", name: "Michael Brown", email: "michael@example.com", orders: 4, spent: 519.96 },
]

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [productsList, setProductsList] = useState(products)

  useEffect(() => {
    setMounted(true)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && mounted) {
      if (!user) {
        router.push("/login?redirectTo=/admin")
      }
    }
  }, [isLoading, user, router, mounted])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  // Handle product added
  const handleProductAdded = () => {
    // In a real app, you would fetch the updated product list
    // For demo, we'll just add a dummy product
    const newProduct = {
      id: `${productsList.length + 1}`,
      name: "New Product",
      category: "Electronics",
      price: 99.99,
      stock: 10,
    }

    setProductsList([newProduct, ...productsList])
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If not authenticated, show login prompt
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <LogIn className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t("admin.login_required")}</h1>
        <p className="text-muted-foreground mb-4">{t("admin.login_message")}</p>
        <Button asChild>
          <Link href="/login?redirectTo=/admin">{t("admin.login")}</Link>
        </Button>
      </div>
    )
  }

  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Lock className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t("admin.access_denied")}</h1>
        <p className="text-muted-foreground mb-4">{t("admin.no_permission")}</p>
        <p className="text-sm text-muted-foreground mb-6 max-w-md text-center">{t("admin.admin_only")}</p>
        <Button onClick={() => router.push("/")}>{t("admin.return_home")}</Button>
      </div>
    )
  }

  return (
    <ClientSafeComponent>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t("admin.dashboard")}</h1>
            <p className="text-muted-foreground">{t("admin.dashboard_description")}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10 w-64"
                placeholder={t("admin.search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setAddProductOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("admin.add_product")}
            </Button>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("admin.total_revenue")}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345.67</div>
              <p className="text-xs text-muted-foreground">{t("admin.revenue_increase", { percent: "12.5%" })}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("admin.orders")}</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">{t("admin.orders_increase", { percent: "8.2%" })}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("admin.products")}</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">{t("admin.products_increase", { count: "3" })}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t("admin.customers")}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,345</div>
              <p className="text-xs text-muted-foreground">{t("admin.customers_increase", { percent: "18.7%" })}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">{t("admin.orders")}</TabsTrigger>
            <TabsTrigger value="products">{t("admin.products")}</TabsTrigger>
            <TabsTrigger value="customers">{t("admin.customers")}</TabsTrigger>
            <TabsTrigger value="analytics">{t("admin.analytics")}</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.recent_orders")}</CardTitle>
                <CardDescription>{t("admin.manage_orders")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.order_id")}</TableHead>
                      <TableHead>{t("admin.customer")}</TableHead>
                      <TableHead>{t("admin.date")}</TableHead>
                      <TableHead>{t("admin.status")}</TableHead>
                      <TableHead>{t("admin.total")}</TableHead>
                      <TableHead>{t("admin.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "processing"
                                  ? "secondary"
                                  : order.status === "pending"
                                    ? "outline"
                                    : order.status === "shipped"
                                      ? "default"
                                      : "destructive"
                            }
                          >
                            {t(`admin.status.${order.status}`)}
                          </Badge>
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.products")}</CardTitle>
                <CardDescription>{t("admin.manage_products")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>{t("admin.name")}</TableHead>
                      <TableHead>{t("admin.category")}</TableHead>
                      <TableHead>{t("admin.price")}</TableHead>
                      <TableHead>{t("admin.stock")}</TableHead>
                      <TableHead>{t("admin.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productsList.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={product.stock > 10 ? "default" : product.stock > 0 ? "outline" : "destructive"}
                          >
                            {product.stock}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.customers")}</CardTitle>
                <CardDescription>{t("admin.manage_customers")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>{t("admin.name")}</TableHead>
                      <TableHead>{t("admin.email")}</TableHead>
                      <TableHead>{t("admin.orders_count")}</TableHead>
                      <TableHead>{t("admin.total_spent")}</TableHead>
                      <TableHead>{t("admin.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>${customer.spent.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.analytics")}</CardTitle>
                <CardDescription>{t("admin.analytics_description")}</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">{t("admin.analytics_dashboard")}</h3>
                  <p className="text-muted-foreground max-w-md">{t("admin.analytics_message")}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Product Dialog */}
      <AdminAddProduct open={addProductOpen} onOpenChange={setAddProductOpen} onProductAdded={handleProductAdded} />
    </ClientSafeComponent>
  )
}


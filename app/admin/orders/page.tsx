"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { useToast } from "../../components/ui/use-toast"

// Dummy data for orders
const initialOrders = [
  { id: 1, customer: "John Doe", total: 59.99, status: "Pending" },
  { id: 2, customer: "Jane Smith", total: 129.99, status: "Pending" },
  { id: 3, customer: "Bob Johnson", total: 89.99, status: "Pending" },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const { toast } = useToast()

  const handleAcceptOrder = (id) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: "Accepted" } : order)))
    toast({
      title: "Order accepted",
      description: "The order has been accepted successfully.",
    })
  }

  const handleRejectOrder = (id) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: "Rejected" } : order)))
    toast({
      title: "Order rejected",
      description: "The order has been rejected.",
    })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {order.status === "Pending" && (
                  <>
                    <Button variant="outline" className="mr-2" onClick={() => handleAcceptOrder(order.id)}>
                      Accept
                    </Button>
                    <Button variant="destructive" onClick={() => handleRejectOrder(order.id)}>
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


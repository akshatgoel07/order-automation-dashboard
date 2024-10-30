"use client";
import React, { useState } from "react";
import { Search, SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Page = () => {
	console.log("Kitchen Dashboard rendering");
	const [orders, setOrders] = useState([
		{
			tableNumber: 5,
			items: [
				{ name: "Margherita Pizza", quantity: 2 },
				{ name: "Caesar Salad", quantity: 1 },
				{ name: "Garlic Bread", quantity: 1 },
				{ name: "Spaghetti Carbonara", quantity: 1 },
				{ name: "Tiramisu", quantity: 1 },
			],
			status: "pending",
		},
		{
			tableNumber: 3,
			items: [
				{ name: "Margherita Pizza", quantity: 2 },
				{ name: "Caesar Salad", quantity: 1 },
				{ name: "Garlic Bread", quantity: 1 },
				{ name: "Spaghetti Carbonara", quantity: 1 },
				{ name: "Tiramisu", quantity: 1 },
			],
			status: "pending",
		},
	]);

	const [searchQuery, setSearchQuery] = useState("");
	const [filterStatus, setFilterStatus] = useState("pending");

	const handleCompleteOrder = (tableNumber) => {
		setOrders(
			orders.map((order) =>
				order.tableNumber === tableNumber
					? { ...order, status: "completed", completedAt: new Date() }
					: order,
			),
		);
	};

	const filteredOrders = orders.filter(
		(order) =>
			order.tableNumber.toString().includes(searchQuery) &&
			order.status === filterStatus,
	);

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<div className="space-y-6">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<h1 className="text-2xl font-bold">Kitchen Dashboard</h1>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search Table Number"
								className="pl-8 w-[250px]"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="default">
									<SlidersHorizontal className="h-4 w-4 mr-2" />
									{filterStatus === "pending"
										? "Pending Orders"
										: "Completed Orders"}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={() => setFilterStatus("pending")}
									className="flex items-center justify-between"
								>
									Pending Orders
									{filterStatus === "pending" && (
										<Check className="h-4 w-4 ml-2" />
									)}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => setFilterStatus("completed")}
									className="flex items-center justify-between"
								>
									Completed Orders
									{filterStatus === "completed" && (
										<Check className="h-4 w-4 ml-2" />
									)}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="grid gap-6 md:grid-cols-2">
					{filteredOrders.map((order) => (
						<Card key={order.tableNumber}>
							<CardHeader>
								<CardTitle className="flex justify-between items-center">
									<span>Table #{order.tableNumber}</span>
									{order.status === "completed" &&
										order.completedAt && (
											<span className="text-sm text-muted-foreground">
												Completed at:{" "}
												{order.completedAt.toLocaleTimeString()}
											</span>
										)}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-2">
									{order.items.map((item, index) => (
										<div
											key={index}
											className="flex justify-between"
										>
											<span>{item.name}</span>
											<span className="text-muted-foreground">
												(x{item.quantity})
											</span>
										</div>
									))}
								</div>
								{order.status === "pending" && (
									<Button
										className="w-full"
										onClick={() =>
											handleCompleteOrder(
												order.tableNumber,
											)
										}
									>
										Complete Order
									</Button>
								)}
								{order.status === "completed" && (
									<div className="w-full py-2 text-center text-sm text-green-600 bg-green-50 rounded-md">
										Order Completed
									</div>
								)}
							</CardContent>
						</Card>
					))}
					{filteredOrders.length === 0 && (
						<div className="md:col-span-2 text-center py-12 text-muted-foreground">
							No {filterStatus} orders found
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Page;

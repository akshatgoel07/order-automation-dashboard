"use client";

import { useState } from "react";
import { Pencil, Search, Trash2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

import { generateQRCodePDF } from "@/lib/utils";

export default function Component() {
	const [tables, setTables] = useState([
		{ id: 1, tableNumber: "54" },
		{ id: 2, tableNumber: "23" },
		{ id: 3, tableNumber: "12" },
		{ id: 4, tableNumber: "45" },
		{ id: 5, tableNumber: "78" },
	]);
	const [searchQuery, setSearchQuery] = useState("");
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [addDialogOpen, setAddDialogOpen] = useState(false);
	const [selectedTable, setSelectedTable] = useState(null);
	const [editedTableNumber, setEditedTableNumber] = useState("");
	const [newTableNumber, setNewTableNumber] = useState("");

	const filteredTables = tables.filter((table) =>
		table.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const handleAddTable = () => {
		if (newTableNumber.trim()) {
			if (
				tables.some(
					(table) => table.tableNumber === newTableNumber.trim(),
				)
			) {
				toast({
					title: "Error",
					description: "This table number already exists.",
					variant: "destructive",
				});
				return;
			}

			const newId = Math.max(...tables.map((table) => table.id), 0) + 1;
			setTables([
				...tables,
				{ id: newId, tableNumber: newTableNumber.trim() },
			]);
			setAddDialogOpen(false);
			setNewTableNumber("");
			toast({
				title: "Success",
				description: "Table added successfully.",
			});
		}
	};

	const handleEdit = (table) => {
		setSelectedTable(table);
		setEditedTableNumber(table.tableNumber);
		setEditDialogOpen(true);
	};

	const handleSaveEdit = () => {
		if (selectedTable && editedTableNumber.trim()) {
			if (
				tables.some(
					(table) =>
						table.id !== selectedTable.id &&
						table.tableNumber === editedTableNumber.trim(),
				)
			) {
				toast({
					title: "Error",
					description: "This table number already exists.",
					variant: "destructive",
				});
				return;
			}

			setTables(
				tables.map((table) =>
					table.id === selectedTable.id
						? { ...table, tableNumber: editedTableNumber.trim() }
						: table,
				),
			);
			setEditDialogOpen(false);
			setSelectedTable(null);
			setEditedTableNumber("");
			toast({
				title: "Success",
				description: "Table updated successfully.",
			});
		}
	};

	const handleDelete = (table) => {
		setSelectedTable(table);
		setDeleteDialogOpen(true);
	};

	const confirmDelete = () => {
		if (selectedTable) {
			setTables(tables.filter((table) => table.id !== selectedTable.id));
			setDeleteDialogOpen(false);
			setSelectedTable(null);
			toast({
				title: "Success",
				description: "Table deleted successfully.",
			});
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto p-6">
			<div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
				<h1 className="text-2xl font-bold">Table Management</h1>
				<div className="flex flex-col md:flex-row gap-4">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search Table Number"
							className="pl-8 w-[250px]"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<Button onClick={() => setAddDialogOpen(true)}>
						Add Table
					</Button>
				</div>
			</div>

			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Table Number</TableHead>
							<TableHead className="text-right">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredTables.map((table) => (
							<TableRow key={table.id}>
								<TableCell>{table.tableNumber}</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={() =>
												generateQRCodePDF(
													table.tableNumber,
												)
											}
										>
											<QrCode className="h-4 w-4" />
											<span className="sr-only">
												Generate QR code
											</span>
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleEdit(table)}
										>
											<Pencil className="h-4 w-4" />
											<span className="sr-only">
												Edit table
											</span>
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleDelete(table)}
										>
											<Trash2 className="h-4 w-4" />
											<span className="sr-only">
												Delete table
											</span>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
				<div>
					{filteredTables.length} of {tables.length} row(s) selected.
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="sm"
						disabled={filteredTables.length === 0}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						disabled={filteredTables.length === 0}
					>
						Next
					</Button>
				</div>
			</div>

			{/* Add Dialog */}
			<Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Table</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="newTableNumber">Table Number</Label>
							<Input
								id="newTableNumber"
								value={newTableNumber}
								onChange={(e) =>
									setNewTableNumber(e.target.value)
								}
								placeholder="Enter table number"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => {
								setAddDialogOpen(false);
								setNewTableNumber("");
							}}
						>
							Cancel
						</Button>
						<Button onClick={handleAddTable}>Add table</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Edit Dialog */}
			<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Table Number</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="tableNumber">Table Number</Label>
							<Input
								id="tableNumber"
								value={editedTableNumber}
								onChange={(e) =>
									setEditedTableNumber(e.target.value)
								}
								placeholder="Enter table number"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => {
								setEditDialogOpen(false);
								setEditedTableNumber("");
							}}
						>
							Cancel
						</Button>
						<Button onClick={handleSaveEdit}>Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Dialog */}
			<AlertDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete table number {selectedTable?.tableNumber}.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={confirmDelete}>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

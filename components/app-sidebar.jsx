import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Kitchen Dashboard",
		url: "kitchen-dashboard",
		icon: Inbox,
	},
	{
		title: "Business Dashboard",
		url: "business-dashboard",
		icon: Calendar,
	},
	// {
	// 	title: "Search",
	// 	url: "#",
	// 	icon: Search,
	// },
	// {
	// 	title: "Settings",
	// 	url: "#",
	// 	icon: Settings,
	// },
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}

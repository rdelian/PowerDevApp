import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useLocalStorage } from "../lib/useLocalStorage";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

// type RandomTaskProps = {};

export const RandomTask = () => {
	const [tasksList, setTasksList] = useLocalStorage<string[]>("randomTasks", []);
	const [newTask, setNewTask] = useState("");
	const [selectedTask, setSelectedTask] = useState<string | null>(null);

	const addTask = () => {
		if (newTask.trim() && !tasksList.includes(newTask.trim())) {
			setTasksList([...tasksList, newTask.trim()]);
			setNewTask("");
		}
	};

	const removeTask = (taskToRemove: string) => {
		setTasksList(tasksList.filter(task => task !== taskToRemove));
	};

	const selectRandomTask = () => {
		if (tasksList.length === 0) return;

		const randomIndex = Math.floor(Math.random() * tasksList.length);
		const randomTask = tasksList[randomIndex];

		setSelectedTask(randomTask);
		removeTask(randomTask);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") addTask();
	};

	return (
		<div className="border-2 p-4 rounded-md space-y-4">
			<h2 className="text-sm">Random Task Selector</h2>

			{/* Add new task section */}
			<div className="flex gap-2">
				<Input
					type="text"
					placeholder="Enter a new task..."
					value={newTask}
					onChange={e => setNewTask(e.target.value)}
					onKeyDown={handleKeyPress}
					className="flex-1"
				/>
				<Button onClick={addTask} disabled={!newTask.trim()} size="default">
					<FaPlus />
				</Button>
			</div>

			{/* Tasks list */}
			{tasksList.length > 0 && (
				<div className="space-y-2">
					<div className="space-y-2">
						<ScrollArea className="h-[200px] w-[350px] rounded-md pr border-2">
							{tasksList.map((task, index) => (
								<>
									<div key={index} className="flex items-center justify-between m-1 rounded-md ">
										<span className="flex-1">{task}</span>
										<FaXmark onClick={() => removeTask(task)} className="hover:text-destructive mr-2" />
									</div>
									<Separator className="" />
								</>
							))}
						</ScrollArea>
					</div>
				</div>
			)}

			{/* Random selection button */}
			{tasksList.length > 0 && (
				<Button onClick={selectRandomTask} className="w-full" size="lg">
					{`Pick Random (${tasksList.length})`}
				</Button>
			)}

			{/* Selected task alert */}
			{selectedTask && (
				<Alert className="border-green-500 bg-green-50 dark:bg-green-950 w-[350px]">
					<AlertDescription className="font-medium text-green-800 dark:text-green-200">
						<span>
							🎯 Your task: <strong>{selectedTask}</strong>
						</span>
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
};

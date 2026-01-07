import { useState } from "react";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useLocalStorage } from "../lib/useLocalStorage";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

// type RandomTaskProps = {};

export const RandomTask = () => {
	const [tasksList, setTasksList] = useLocalStorage<string[]>("randomTasks", []);
	const [newTask, setNewTask] = useState("");
	const [selectedTask, setSelectedTask] = useState<string | null>(null);

	const addTask = () => {
		const tasks = newTask
			.split("\n")
			.map(task => task.trim())
			.filter(task => task !== "");

		const newUniqueTasks = tasks.filter(task => !tasksList.includes(task));

		if (newUniqueTasks.length > 0) {
			setTasksList([...tasksList, ...newUniqueTasks]);
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
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			addTask();
		}
	};

	return (
		<div className="border-2 p-4 rounded-md space-y-4 md:w-90">
			<h2 className="text-sm">Random Task Selector</h2>

			{/* Add new task section */}
			<div className="grid gap-2">
				<Textarea
					placeholder="New task or tasks separated by new lines"
					value={newTask}
					onChange={e => setNewTask(e.target.value)}
					onKeyDown={handleKeyPress}
					className="flex-1"
				/>
				<Button onClick={addTask} disabled={!newTask.trim()} size="default" className="">
					<FaPlus />
				</Button>
			</div>

			{/* Tasks list */}
			{tasksList.length > 0 && (
				<div className="space-y-2">
					<div className="space-y-2">
						<ScrollArea className="h-50 rounded-md pr border-2">
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
				<Button onClick={selectRandomTask} className="" size="lg">
					{`Pick Random (${tasksList.length})`}
				</Button>
			)}

			{/* Selected task alert */}
			{selectedTask && (
				<Alert className="border-green-500 bg-green-50 dark:bg-green-950">
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

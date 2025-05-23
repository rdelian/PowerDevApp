import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { FaPlus } from "react-icons/fa";

// type RandomTaskProps = {};

export const RandomTask = () => {
	const [tasksList, setTasksList] = useState<string[]>([]);
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
		setTasksList(tasksList.filter((_, index) => index !== randomIndex));
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			addTask();
		}
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
					<h3 className="text-lg font-semibold">Tasks ({tasksList.length})</h3>
					<div className="space-y-2">
						{tasksList.map((task, index) => (
							<div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
								<span className="flex-1">{task}</span>
								<Button variant="destructive" size="sm" onClick={() => removeTask(task)} className="ml-2">
									×
								</Button>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Random selection button */}
			<Button onClick={selectRandomTask} disabled={tasksList.length === 0} className="w-full" size="lg">
				{tasksList.length === 0 ? "No tasks available" : `Pick Random Task (${tasksList.length} available)`}
			</Button>

			{/* Empty state */}
			{tasksList.length === 0 && !selectedTask && (
				<div className="text-center py-8 text-muted-foreground">
					<p>No tasks yet. Add some tasks to get started!</p>
				</div>
			)}

			{/* Selected task alert */}
			{selectedTask && (
				<Alert className="border-green-500 bg-green-50 dark:bg-green-950">
					<AlertDescription className="font-medium text-green-800 dark:text-green-200">
						<span>🎯 Your task: <strong>{selectedTask}</strong></span>
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
};

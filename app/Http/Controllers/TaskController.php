<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::all(['id', 'name']);
        $selectedProjectId = $request->input('project_id');
        
        if (!$selectedProjectId && $projects->isNotEmpty()) {
            $selectedProjectId = $projects->first()->id;
        }

        $tasks = collect();

        if ($selectedProjectId) {
            $project = Project::find($selectedProjectId);
            $tasks = $project->tasks; 
        }

        return Inertia::render('Tasks/TaskList', [
            'projects' => $projects,
            'tasks' => $tasks,
            'selectedProjectId' => (int) $selectedProjectId,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'project_id' => ['required', 'integer', Rule::exists('projects', 'id')],
        ]);

        // New task goes to the end of the list (max priority + 1)
        $maxPriority = Task::where('project_id', $data['project_id'])->max('priority') ?? 0;

        Task::create([
            'name' => $data['name'],
            'project_id' => $data['project_id'],
            'priority' => $maxPriority + 1,
        ]);

        return back();
    }

    public function update(Request $request, Task $task)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        
        $task->update($data);

        return back();
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return back();
    }
    
    /**
     * Handles the drag-and-drop priority update.
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'tasks' => 'required|array',
            'tasks.*.id' => ['required', 'integer', Rule::exists('tasks', 'id')],
            'tasks.*.priority' => 'required|integer|min:1',
        ]);

        // Use a database transaction to ensure data integrity during multiple updates
        DB::transaction(function () use ($request) {
            foreach ($request->tasks as $taskData) {
                Task::where('id', $taskData['id'])->update(['priority' => $taskData['priority']]);
            }
        });

        return response()->json(['message' => 'Tasks reordered successfully.'], 200);
    }
}
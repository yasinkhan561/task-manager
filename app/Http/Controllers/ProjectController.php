<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(){
        $projects = Project::all();
        return Inertia::render('Projects/ProjectList', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:projects,name',
        ]);

        $project = Project::create($data);
        return redirect()->route('tasks.index', ['project_id' => $project->id])
                         ->with('success', 'Project created successfully. Start adding tasks!');
    }
}

import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

interface FormProps {
    name: string;
}

const ProjectCreate: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm<FormProps>({
        name: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("projects.store"));
    };

    return (
        <div className="container mt-5">
            <Head title="Create Project" />

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4 text-primary">➕ Create New Project</h2>

                    <div className="card bg-white p-5 shadow-sm">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={(errors as any).name}
                                />
                            </div>

                            <div className="d-flex justify-content-between">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={processing || !data.name}
                                >
                                    {processing
                                        ? "Creating..."
                                        : "Create Project"}
                                </button>
                                <Link
                                    href={route("dashboard")}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCreate;

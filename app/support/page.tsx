"use client";

import ActionButton from "@/components/buttons/ActionButton";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextArea";
import { FC } from "react";
import { useState } from "react";

interface Props {}

type FormState = {
  task: string;
  name: string;
  email: string;
  priority: string;
  tag: string;
  description: string;
};

const SupportPage: FC<Props> = (props): JSX.Element => {
  const [formData, setFormData] = useState<FormState>({
    task: "",
    name: "",
    email: "",
    priority: "",
    tag: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const priorityOptions = [
    { label: "Low", value: "1" },
    { label: "Medium", value: "2" },
    { label: "High", value: "3" },
  ];

  const tagOptions = [
    { label: "Bug", value: "1" },
    { label: "New Feature", value: "2" },
    { label: "Future Enhancement", value: "3" },
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);

    const res = await fetch("/api/support", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("Ticket submitted successfully!");
      (event.currentTarget as HTMLFormElement).reset();
    } else if (res.status === 429) {
      setStatus("Too many requests. Please try again later.");
    } else {
      setStatus("Something went wrong.");
    }

    setIsSubmitting(false);
  }
  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Submit Support Ticket</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          inputName="Task"
          value={formData.task}
          onChange={handleInputChange}
        />
        <Input inputName="Name" value={formData.name} onChange={() => {}} />
        <Input inputName="Email" value={formData.email} onChange={() => {}} />
        <Select
          selectName="Priority"
          value={formData.priority}
          onChange={() => {}}
          options={priorityOptions}
        />
        <Select
          selectName="Tag"
          value={formData.tag}
          onChange={() => {}}
          options={tagOptions}
        />
        <TextArea
          textAreaName="Description"
          value={formData.description}
          onChange={() => {}}
        />
        <ActionButton title="Submit Ticket" disabled={isSubmitting} />
      </form>
    </div>
  );
};

export default SupportPage;

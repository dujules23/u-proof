"use client";

import ActionButton from "@/components/buttons/ActionButton";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextArea";
import { set } from "mongoose";
import { FC } from "react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {}

type FormState = {
  task: string;
  name: string;
  email: string;
  priority: string;
  tag: string;
  description: string;
};

const SupportPage: FC<Props> = (): JSX.Element => {
  const [formData, setFormData] = useState<FormState>({
    task: "",
    name: "",
    email: "",
    priority: "",
    tag: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priorityOptions = [
    { label: "Low", value: "P3 - Low" },
    { label: "Medium", value: "P2 - Medium" },
    { label: "High", value: "P1 - High" },
    { label: "Critical", value: "P0 - Critical" },
  ];

  const tagOptions = [
    { label: "Bug", value: "Bug" },
    { label: "New Feature", value: "New Feature" },
    { label: "Future Enhancement", value: "Future Enhancement" },
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const res = await fetch("/api/support", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setFormData({
        task: "",
        name: "",
        email: "",
        priority: "",
        tag: "",
        description: "",
      });
      toast.success("Support ticket submitted successfully.", {
        classNames: {
          toast: "bg-green-300",
        },
      });
    } else if (res.status === 429) {
      toast.error("Too many requests. Please try again later.", {
        classNames: {
          toast: "bg-red-300",
        },
      });
    } else {
      toast.error(
        "Something went wrong. Contact your application administrator",
        {
          classNames: {
            toast: "bg-red-300",
          },
        }
      );
    }

    setIsSubmitting(false);
  }
  return (
    <div className="max-w-xl mx-auto ptt-6 pb-20">
      <h1 className="text-3xl font-bold mb-6 text-primary-dark dark:text-primary-light">
        Support Ticket Form
      </h1>

      <form method="POST" onSubmit={handleSubmit} className="space-y-4">
        <Input
          inputName="Task"
          // name={task}
          value={formData.task}
          onChange={(event) =>
            setFormData({ ...formData, task: event.target.value })
          }
        />
        <Input
          inputName="Name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />
        <Input
          inputName="Email"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
        <Select
          selectName="Priority"
          value={formData.priority}
          onChange={(event) =>
            setFormData({
              ...formData,
              priority: event.target.value,
            })
          }
          options={priorityOptions}
        />
        <Select
          selectName="Tag"
          value={formData.tag}
          onChange={(event) =>
            setFormData({
              ...formData,
              tag: event.target.value,
            })
          }
          options={tagOptions}
        />
        <TextArea
          textAreaName="Description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        />
        <ActionButton
          title="Submit Ticket"
          disabled={isSubmitting}
          busy={isSubmitting}
        />
      </form>
    </div>
  );
};

export default SupportPage;

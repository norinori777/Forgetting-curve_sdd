import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().optional(),
  tags: z.string().optional(), // comma-separated
});

type FormValues = z.infer<typeof FormSchema>;

export function ItemForm(props: {
  onSubmit: (value: { title: string; content?: string; tags?: string[] }) => void;
  isSubmitting: boolean;
  formId?: string;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const submit = form.handleSubmit((values) => {
    const tags = (values.tags ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    props.onSubmit({
      title: values.title,
      content: values.content?.trim() ? values.content : undefined,
      tags: tags.length ? tags : undefined,
    });
  });

  return (
    <form id={props.formId} onSubmit={submit} className="app-form">
      <div className="app-field">
        <label className="app-label">タイトル</label>
        <input
          className="app-input"
          disabled={props.isSubmitting}
          {...form.register("title")}
        />
        <p className="app-error-text">
          {form.formState.errors.title?.message ?? "\u00A0"}
        </p>
      </div>

      <div className="app-field">
        <label className="app-label">内容（任意）</label>
        <textarea
          className="app-textarea"
          rows={3}
          disabled={props.isSubmitting}
          {...form.register("content")}
        />
      </div>

      <div className="app-field">
        <label className="app-label">タグ（任意、カンマ区切り）</label>
        <input
          className="app-input"
          placeholder="english, verb"
          disabled={props.isSubmitting}
          {...form.register("tags")}
        />
      </div>

      <button type="submit" className="sr-only" disabled={props.isSubmitting}>
        追加
      </button>
    </form>
  );
}

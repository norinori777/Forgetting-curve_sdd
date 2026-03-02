import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  reviewedOn: z.string().min(1, "日付は必須です"),
  result: z.enum(["success", "failure"], {
    required_error: "結果は必須です",
  }),
  difficulty: z
    .preprocess(
      (value) => {
        if (value === "" || value === undefined || value === null) return undefined;
        return Number(value);
      },
      z.number().int().min(1).max(5).optional()
    )
    .optional(),
  memo: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function ReviewForm(props: {
  defaultReviewedOn: string;
  isSubmitting: boolean;
  onSubmit: (value: {
    reviewedOn: string;
    result: "success" | "failure";
    difficulty?: number;
    memo?: string;
  }) => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reviewedOn: props.defaultReviewedOn,
      result: undefined,
      difficulty: undefined,
      memo: "",
    },
  });

  const submit = form.handleSubmit((values) => {
    props.onSubmit({
      reviewedOn: values.reviewedOn,
      result: values.result,
      difficulty: values.difficulty,
      memo: values.memo?.trim() ? values.memo : undefined,
    });
  });

  return (
    <form onSubmit={submit} className="app-form">
      <div className="app-field">
        <label className="app-label">復習日</label>
        <input
          type="date"
          className="app-input"
          disabled={props.isSubmitting}
          {...form.register("reviewedOn")}
        />
        <p className="app-error-text">
          {form.formState.errors.reviewedOn?.message ?? "\u00A0"}
        </p>
      </div>

      <div className="app-field">
        <label className="app-label">結果（必須）</label>
        <div className="flex flex-wrap gap-2">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              value="success"
              disabled={props.isSubmitting}
              {...form.register("result")}
            />
            <span>成功</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              value="failure"
              disabled={props.isSubmitting}
              {...form.register("result")}
            />
            <span>失敗</span>
          </label>
        </div>
        <p className="app-error-text">
          {form.formState.errors.result?.message ?? "\u00A0"}
        </p>
      </div>

      <div className="app-field">
        <label className="app-label">難易度（任意、1〜5）</label>
        <select
          className="app-input"
          disabled={props.isSubmitting}
          {...form.register("difficulty")}
        >
          <option value="">未設定</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="app-field">
        <label className="app-label">メモ（任意）</label>
        <textarea
          className="app-textarea"
          rows={3}
          disabled={props.isSubmitting}
          {...form.register("memo")}
        />
      </div>

      <button type="submit" className="app-button-primary" disabled={props.isSubmitting}>
        {props.isSubmitting ? "送信中..." : "記録"}
      </button>
    </form>
  );
}

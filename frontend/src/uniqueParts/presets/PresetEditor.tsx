import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { ReviewPreset } from "@fc/shared";

const FormSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  intervalsDays: z
    .string()
    .min(1, "intervalsDays は必須です")
    .refine(
      (value) => {
        const nums = value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
          .map((s) => Number(s));
        return nums.length > 0 && nums.every((n) => Number.isInteger(n) && n >= 0);
      },
      { message: "0以上の整数をカンマ区切りで入力してください" }
    ),
});

type FormValues = z.infer<typeof FormSchema>;

function parseIntervalsDays(value: string): number[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => Number(s))
    .filter((n) => Number.isInteger(n) && n >= 0);
}

export function PresetEditor(props: {
  preset: ReviewPreset;
  isActive: boolean;
  isSaving: boolean;
  isSettingActive: boolean;
  saveError?: string | null;
  onSave: (value: { name: string; intervalsDays: number[] }) => void;
  onSetActive: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: props.preset.name,
      intervalsDays: props.preset.intervalsDays.join(", "),
    },
  });

  const submit = form.handleSubmit((values) => {
    props.onSave({
      name: values.name,
      intervalsDays: parseIntervalsDays(values.intervalsDays),
    });
  });

  return (
    <section className="app-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="app-h2">{props.preset.name}</h2>
            {props.isActive && <span className="app-badge">active</span>}
          </div>
          <p className="app-muted">復習間隔（日数）を編集できます。</p>
        </div>
        <button
          type="button"
          className="app-button-secondary"
          disabled={props.isActive || props.isSettingActive}
          onClick={props.onSetActive}
        >
          {props.isActive
            ? "選択中"
            : props.isSettingActive
              ? "切替中..."
              : "アクティブにする"}
        </button>
      </div>

      <form onSubmit={submit} className="app-form">
        <div className="app-field">
          <label className="app-label">名前</label>
          <input
            className="app-input"
            disabled={props.isSaving}
            {...form.register("name")}
          />
          <p className="app-error-text">
            {form.formState.errors.name?.message ?? "\u00A0"}
          </p>
        </div>

        <div className="app-field">
          <label className="app-label">intervalsDays（カンマ区切り）</label>
          <input
            className="app-input"
            disabled={props.isSaving}
            placeholder="0, 1, 3, 7"
            {...form.register("intervalsDays")}
          />
          <p className="app-error-text">
            {form.formState.errors.intervalsDays?.message ?? "\u00A0"}
          </p>
        </div>

        <button type="submit" className="app-button-primary" disabled={props.isSaving}>
          {props.isSaving ? "保存中..." : "保存"}
        </button>

        {props.saveError && <div className="app-error-box">{props.saveError}</div>}
      </form>
    </section>
  );
}

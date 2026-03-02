import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getApiErrorMessage } from "../services/api/error";
import { getPresets, patchPreset, putActivePreset } from "../services/api/presets";
import { PresetEditor } from "../uniqueParts/presets/PresetEditor";

export function PresetsPage() {
  const queryClient = useQueryClient();

  const presetsQuery = useQuery({
    queryKey: ["presets"],
    queryFn: getPresets,
  });

  const patchMutation = useMutation({
    mutationFn: async (params: {
      presetId: string;
      body: { name: string; intervalsDays: number[] };
    }) => patchPreset(params.presetId, params.body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["presets"] });
    },
  });

  const activeMutation = useMutation({
    mutationFn: putActivePreset,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["presets"] });
    },
  });

  const listError = presetsQuery.isError
    ? getApiErrorMessage(presetsQuery.error) ?? "取得に失敗しました。"
    : null;

  return (
    <main className="app-page">
      <header className="app-header">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="app-h1">プリセット</h1>
            <p className="app-muted">復習間隔を編集し、アクティブを切り替えます。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="app-button-secondary" to="/">
              学習項目
            </Link>
            <Link className="app-button-secondary" to="/review">
              復習
            </Link>
            <Link className="app-button-secondary" to="/stats">
              集計
            </Link>
          </div>
        </div>
      </header>

      {listError && <div className="app-error-box">{listError}</div>}
      {presetsQuery.isLoading && <p className="app-muted">読み込み中...</p>}

      {presetsQuery.data && (
        <div className="grid gap-4">
          {presetsQuery.data.presets.map((preset) => {
            const isActive = preset.id === presetsQuery.data.activeReviewPresetId;
            const isSaving =
              patchMutation.isPending && patchMutation.variables?.presetId === preset.id;
            const isSettingActive =
              activeMutation.isPending && activeMutation.variables === preset.id;

            const saveError =
              patchMutation.isError && patchMutation.variables?.presetId === preset.id
                ? getApiErrorMessage(patchMutation.error) ?? "保存に失敗しました。"
                : null;

            return (
              <PresetEditor
                key={preset.id}
                preset={preset}
                isActive={isActive}
                isSaving={isSaving}
                isSettingActive={isSettingActive}
                saveError={saveError}
                onSave={(value) => {
                  patchMutation.mutate({ presetId: preset.id, body: value });
                }}
                onSetActive={() => {
                  activeMutation.mutate(preset.id);
                }}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}

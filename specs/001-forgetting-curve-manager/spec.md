# Feature Specification: 忘却曲線管理（Forgetting Curve Manager）

**Feature Branch**: `001-forgetting-curve-manager`  
**Created**: 2026-02-24  
**Status**: Draft  
**Input**: User description: "忘却曲線を管理するシステムの開発をしたいです"

## Clarifications

### Session 2026-02-24

- Q: 利用形態（ユーザー/認証）はどれにしますか？ → A: 単一ユーザー（ログインなし・個人利用前提）
- Q: データの保存場所（永続化の前提）はどれにしますか？ → A: ローカル保存（この端末内に永続化。クラウド同期なし）
- Q: 復習結果として「必須で記録する項目」はどれにしますか？ → A: 成功/失敗のみ必須（難易度・メモは任意）
- Q: 次の復習予定の「更新ルール」はどれにしますか？ → A: ユーザーが復習間隔をカスタム設定できる（プリセット編集含む）
- Q: 「期限内実施率」の期限内はどれで判定しますか？ → A: 復習予定日と同じ日に実施なら期限内（時刻は見ない）

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - 学習項目を登録し、次の復習タイミングを把握する (Priority: P1)

学習者として、覚えたい内容（学習項目）を登録し、忘却曲線にもとづく「次に復習すべき時刻」を一覧で把握したい。そうすることで、いつ何を復習するかを迷わずに学習を継続できる。

**Why this priority**: 本機能の核は「復習タイミングの可視化」であり、これがないと忘却曲線の管理にならないため。

**Independent Test**: 1つの学習項目を登録し、直後に「次の復習予定日」が表示されることを確認できる。

**Acceptance Scenarios**:

1. **Given** 学習項目が未登録である, **When** 学習項目（タイトルと内容）を1件登録する, **Then** 登録した学習項目が一覧に表示され、次の復習予定日が表示される
2. **Given** 学習項目が複数登録されている, **When** 復習予定順で一覧を表示する, **Then** 復習予定が近い順に並び替えられ、期限切れ（未実施で予定日時を過ぎた）項目が識別できる

---

### User Story 2 - 復習を実行し、結果を記録して復習計画を更新する (Priority: P2)

学習者として、復習セッションを開始し、各学習項目について「思い出せた/思い出せなかった」の結果を記録したい。そうすることで、復習計画が更新され、次に復習すべきタイミングが現状に合うようになる。

**Why this priority**: 予定の可視化だけでは計画が固定化され、実際の記憶状態に追従できないため。

**Independent Test**: 1件の学習項目に対して復習結果を登録し、次の復習予定日時が更新されることを確認できる。

**Acceptance Scenarios**:

1. **Given** 復習予定が到来している学習項目がある, **When** 復習を実施し結果（例: 思い出せた）を記録する, **Then** その学習項目の最終復習日時と次の復習予定日が更新される
2. **Given** 復習予定が到来している学習項目がある, **When** 復習を実施し結果（例: 思い出せなかった）を記録する, **Then** 次の復習予定日がより早い日付に再計画され、復習失敗として履歴に残る

---

### User Story 3 - 学習状況を振り返り、継続のための指標を確認する (Priority: P3)

学習者として、復習の実施状況（期限内実施率、遅延数、復習成功率など）を確認したい。そうすることで、学習の継続可否や負荷を調整できる。

**Why this priority**: 継続学習では状況把握が重要だが、P1/P2に比べると価値提供の順序は後になるため。

**Independent Test**: いくつかの復習履歴を作成した上で、集計値（例: 直近7日）を画面上で確認できる。

**Acceptance Scenarios**:

1. **Given** 復習履歴が存在する, **When** 期間（例: 直近7日）を指定して状況を表示する, **Then** 期限内実施率、遅延数、復習成功率が算出され表示される

---

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- 学習項目の内容が空、または極端に短い/長い場合でも登録できるが、必須項目（タイトル等）が欠ける場合は登録できない
- 復習予定日時を大幅に過ぎた「期限切れ」項目が大量にある場合、一覧表示と復習開始が継続できる（操作不能にならない）
- 同一の学習項目に対して短時間に複数回の復習結果が登録された場合、すべて履歴として残り、次の復習予定は最新の結果にもとづく
- 未来日時（誤操作）で復習結果が記録されそうな場合、記録を拒否または明確に警告し、データ整合性を守る

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST 学習項目（タイトル、内容、任意のタグ/カテゴリ）を作成・参照・更新・削除できるようにする
- **FR-002**: System MUST 各学習項目に対して、忘却曲線にもとづく「次の復習予定日」を算出し、一覧で表示する
- **FR-003**: System MUST 復習予定日で並び替え、期限切れ（未実施で予定日を過ぎた）を識別して表示する
- **FR-004**: Users MUST be able to 復習セッションを開始し、復習対象（例: 期限到来/期限切れ/指定タグ）を選んで進められる
- **FR-005**: System MUST 各復習について、実施日時と結果（最低限: 成功/失敗、任意: 主観難易度（1〜5）とメモ）を履歴として保存する
- **FR-006**: System MUST 復習結果の記録後、該当学習項目の次の復習予定日を更新する
- **FR-007**: System MUST 学習状況の集計値（期限内実施率、遅延数、復習成功率）を、指定期間で表示する
- **FR-008**: Users MUST be able to 復習間隔のプリセットを編集し、以後の復習予定更新に反映できる
- **FR-009**: System MUST スマホ/タブレット/PC で主要画面が操作できるように、UIをレスポンシブ対応する

### Acceptance Criteria for Functional Requirements

- **FR-001**: 学習項目を作成・参照・更新・削除でき、削除後は一覧/復習対象/集計に表示されない
- **FR-002**: 学習項目を登録すると、当該項目に次回復習予定日が作成され、一覧で確認できる
- **FR-003**: 一覧で復習予定日順に並べ替えられ、予定日を過ぎた未実施項目が期限切れとして識別される
- **FR-004**: 復習開始時に対象条件を選択でき、選択条件に一致する項目だけが復習対象として提示される
- **FR-005**: 1つの復習に対して実施日時と成功/失敗が保存され、任意で難易度（1〜5）とメモが保存できる
- **FR-006**: 復習結果を記録すると、当該項目の次回復習予定日が更新される（更新前後で予定日が変化する）
- **FR-007**: 期間を指定すると、期限内実施率・遅延数・復習成功率が表示され、期間を変えると値が変化する（期限内=復習予定日と同日実施）
- **FR-008**: 復習間隔プリセットを変更すると、以後に記録する復習結果の計画更新に新しいプリセットが用いられる
- **FR-009**: スマホ/タブレット/PC それぞれで、少なくとも「学習項目一覧」「復習」「プリセット編集」「集計」を操作でき、レイアウト崩れで操作不能にならない

### Scope

- 忘却曲線にもとづく復習計画（次の復習予定）の算出と、その運用（一覧・復習・履歴・集計）を対象とする

### Out of Scope

- 複数人での共有学習（クラス/チーム管理）、管理者による割当て
- ユーザー登録/ログイン/権限管理
- クラウド同期（端末間同期）
- 外部サービスとの連携（カレンダー同期等）
- 画像・音声などリッチメディアの学習項目（テキスト中心を前提）

### Assumptions

- 本MVPは単一ユーザーで利用し、ログインを必要としない
- データ（学習項目・復習履歴・復習予定）はローカル（この端末）に永続化され、クラウド同期はしない
- 学習項目はテキストで表現できる（タイトル/内容）
- 復習結果は最低限「思い出せた/思い出せなかった」の2値で運用可能で、追加の評価は任意
- 忘却曲線は「時間経過により記憶保持率が低下する」ことを前提にし、具体的な数式やアルゴリズムの選定は本仕様の範囲外とする

### Dependencies

- 日付・時刻の基準（現在時刻）が利用でき、復習予定の判定（期限切れ/到来）が一貫して行えること
- 学習項目・復習履歴・復習予定が、同一端末内で継続利用できる形で保持されること

### Key Entities *(include if feature involves data)*

- **User (ローカルプロファイル)**: 単一ユーザー前提の学習計画と履歴の主体（最小限: 表示名、復習間隔プリセット設定）
- **Learning Item (学習項目)**: 覚える対象（タイトル、内容、タグ/カテゴリ、作成日時、状態）
- **Review Event (復習イベント)**: 復習の実施記録（学習項目ID、実施日時、結果、任意メモ）
- **Review Schedule (復習予定)**: 学習項目ごとの次回復習予定（予定日、最終更新日時、任意: 算出根拠スナップショット）

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 新規学習項目を1件登録し、次の復習予定を確認するまでを、初見ユーザーが2分以内に完了できる
- **SC-002**: 100件の学習項目がある状態でも、復習予定一覧が5秒以内に表示され、期限切れ件数が把握できる
- **SC-003**: 復習セッションで10件の復習結果を連続で記録する作業を、平均3分以内で完了できる
- **SC-004**: 直近7日で「期限内に復習できた割合」をユーザーが自己評価できる指標として表示できる（少なくとも 1 つの期間プリセットを提供）

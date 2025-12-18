#!/bin/bash
# Willforward サイトを gemini ディレクトリに同期するスクリプト

SOURCE="/Users/r.a./Documents/03_事業関連/AI事業/DEMO_チームフォルダ/demo_team_workspace/ai-reboot-web/public/we-are-the-world/"
DEST="/Users/r.a./.gemini/antigravity/scratch/we-are-the-world/"

cp -R "${SOURCE}"* "${DEST}"
echo "✅ 同期完了: ${SOURCE} → ${DEST}"

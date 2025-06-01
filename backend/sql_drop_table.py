import sqlite3
import os
from pathlib import Path

# ルートフォルダーのデータベースファイルを参照
current_file_path = Path(__file__).resolve()
project_root = current_file_path.parents[1]
dbname = project_root / "sales_info.db"
conn = sqlite3.connect(dbname)
c = conn.cursor()

# 既存のテーブルを削除
table_name = "sales"
query = f"DROP TABLE IF EXISTS {table_name}"
c.execute(query)

conn.commit()
conn.close()
print(f"テーブル '{table_name}' を削除しました")

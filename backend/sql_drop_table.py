import sqlite3
import os


main_path = os.path.dirname(os.path.abspath(__file__))

def drop_table(table_name: str) -> None:
    """
    指定されたテーブルを削除します。
    テーブルが存在しない場合は何もしません。
    """
    sqlite_file_name = "sales_info.db"
    sqlite_path = os.path.join(main_path, sqlite_file_name)
    
    # SQLite データベースに接続
    conn = sqlite3.connect(sqlite_path)
    
    try:
        cursor = conn.cursor()
        cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
        conn.commit()
        print(f"Table '{table_name}' has been dropped.")
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        conn.close()
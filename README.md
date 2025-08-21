# 🛠️ Project To-Do List (Development Branch)

Branch **dev** adalah branch utama untuk pengembangan aplikasi.  
Semua development **harus dilakukan di branch ini** sebelum digabungkan ke `main`.

---

## ⚠️ Aturan Development
1. **Jangan commit langsung ke `dev`** untuk fitur baru.  
   Selalu buat branch baru untuk setiap fitur.

2. Penamaan branch fitur:  
   - `feature/...` → untuk fitur baru (contoh: `feature/login`, `feature/todo-crud`)  
   - `fix/...` → untuk bug fixing (contoh: `fix/navbar-bug`)  
   - `hotfix/...` → untuk perbaikan urgent

3. Workflow membuat branch fitur:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/nama-fitur

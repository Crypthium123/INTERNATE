@echo off
echo.
echo  ============================================
echo    Internate — Arret du serveur
echo  ============================================
echo.
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
  taskkill /f /pid %%a >nul 2>&1
)
if %errorlevel%==0 (
  echo  ✓ Serveur arrete avec succes
) else (
  echo  - Aucun serveur trouve sur le port 3000
)
echo.
pause

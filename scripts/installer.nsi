!include MUI2.nsh
!include Sections.nsh

Unicode true
SetCompressor lzma
RequestExecutionLevel admin

!define PRODUCT_NAME "MoeKoe Music Lite"
!define PRODUCT_VERSION "0.1.0"
!define PRODUCT_PUBLISHER "LateDreamXD"
!define PRODUCT_WEB_SITE "https://github.com/LateDreamXD/MoeKoeMusicLite"
!define PRODUCT_EXE "MoeKoeMusic Lite.exe"
!define PRODUCT_DIR_REGKEY "Software\Microsoft\Windows\CurrentVersion\App Paths\${PRODUCT_EXE}"
!define PRODUCT_UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}"

Name "${PRODUCT_NAME} ${PRODUCT_VERSION}"
OutFile "..\${PRODUCT_NAME}_Setup_v${PRODUCT_VERSION}.exe"
InstallDir "$PROGRAMFILES64\${PRODUCT_NAME}"
InstallDirRegKey HKLM "${PRODUCT_DIR_REGKEY}" ""

VIProductVersion "0.1.0.0"
VIAddVersionKey /LANG=1033 "ProductName" "${PRODUCT_NAME}"
VIAddVersionKey /LANG=2052 "ProductName" "${PRODUCT_NAME}"
VIAddVersionKey /LANG=1028 "ProductName" "${PRODUCT_NAME}"
VIAddVersionKey /LANG=1033 "FileVersion" "0.1.0.0"
VIAddVersionKey /LANG=2052 "FileVersion" "0.1.0.0"
VIAddVersionKey /LANG=1028 "FileVersion" "0.1.0.0"
VIAddVersionKey /LANG=1033 "FileDescription" "${PRODUCT_NAME} Installer"
VIAddVersionKey /LANG=2052 "FileDescription" "${PRODUCT_NAME} Installer"
VIAddVersionKey /LANG=1028 "FileDescription" "${PRODUCT_NAME} Installer"
VIAddVersionKey /LANG=1033 "CompanyName" "LateDreamXD"
VIAddVersionKey /LANG=2052 "CompanyName" "LateDreamXD"
VIAddVersionKey /LANG=1028 "CompanyName" "LateDreamXD"
VIAddVersionKey /LANG=1033 "LegalCopyright" "Copyright (C) LateDreamXD"
VIAddVersionKey /LANG=2052 "LegalCopyright" "Copyright (C) LateDreamXD"
VIAddVersionKey /LANG=1028 "LegalCopyright" "Copyright (C) LateDreamXD"
VIAddVersionKey /LANG=1033 "Comments" "https://github.com/LateDreamXD/MoeKoeMusicLite"
VIAddVersionKey /LANG=2052 "Comments" "https://github.com/LateDreamXD/MoeKoeMusicLite"
VIAddVersionKey /LANG=1028 "Comments" "https://github.com/LateDreamXD/MoeKoeMusicLite"

!define MUI_ICON "..\assets\win-installer.ico"
!define MUI_UNICON "..\assets\win-installer.ico"
!define MUI_ABORTWARNING
!define MUI_UNABORTWARNING
!define MUI_FINISHPAGE_RUN "$INSTDIR\MoeKoeMusic Lite.exe"

Var StartMenuFolder
!define MUI_STARTMENUPAGE_DEFAULTFOLDER "${PRODUCT_NAME}"
!define MUI_STARTMENUPAGE_REGISTRY_ROOT HKLM
!define MUI_STARTMENUPAGE_REGISTRY_KEY "Software\${PRODUCT_NAME}"
!define MUI_STARTMENUPAGE_REGISTRY_VALUENAME "StartMenuFolder"
!define MUI_LANGDLL_REGISTRY_ROOT HKLM
!define MUI_LANGDLL_REGISTRY_KEY "Software\${PRODUCT_NAME}"
!define MUI_LANGDLL_REGISTRY_VALUENAME "InstallerLanguage"

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "..\LICENSE"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_STARTMENU Application $StartMenuFolder
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_LANGUAGE "SimpChinese"
!insertmacro MUI_LANGUAGE "TradChinese"

!define PRODUCT_MUTEX_NAME "$(^Name)"
!ifndef NSIS_PTR_SIZE & SYSTYPE_PTR
  !define SYSTYPE_PTR i
!else
  !define /ifndef SYSTYPE_PTR p
!endif

!macro SingleInstanceMutex
  System::Call 'KERNEL32::CreateMutex(${SYSTYPE_PTR}0, i1, t"${PRODUCT_MUTEX_NAME}")?e'
  Pop $0
  IntCmpU $0 183 0 single_instance_launch single_instance_launch
    StrCpy $3 ""
  single_instance_findloop:
  FindWindow $3 "#32770" "" "" $3
  StrCmp 0 $3 single_instance_abort
    StrLen $0 "$(^UninstallCaption)"
  IntOp $0 $0 + 1
  System::Call 'USER32::GetWindowText(${SYSTYPE_PTR}r3, t.r0, ir0)'
  StrCmp $0 "$(^UninstallCaption)" single_instance_windowfound ""
    StrLen $0 "$(^SetupCaption)"
  IntOp $0 $0 + 1
  System::Call 'USER32::GetWindowText(${SYSTYPE_PTR}r3, t.r0, ir0)'
  StrCmp $0 "$(^SetupCaption)" single_instance_windowfound single_instance_findloop
  single_instance_windowfound:
  SendMessage $3 0x112 0xF120 0 /TIMEOUT=2000
  System::Call 'USER32::SetForegroundWindow(${SYSTYPE_PTR}r3)'
  single_instance_abort:
  Abort
  single_instance_launch:
!macroend

!include sec_main.nsh

Section "-StartMenuShortcut" SEC_STARTMENU_SHORTCUT
  !insertmacro MUI_STARTMENU_WRITE_BEGIN Application
  CreateDirectory "$SMPROGRAMS\$StartMenuFolder"
  CreateShortcut "$SMPROGRAMS\$StartMenuFolder\${PRODUCT_NAME}.lnk" "$INSTDIR\${PRODUCT_EXE}"
  CreateShortcut "$SMPROGRAMS\$StartMenuFolder\Uninstall.lnk" "$INSTDIR\Uninstall.exe"
  !insertmacro MUI_STARTMENU_WRITE_END
SectionEnd

Section "DesktopShortcut" SEC_DESKTOP_SHORTCUT
  CreateShortcut "$DESKTOP\${PRODUCT_NAME}.lnk" "$INSTDIR\${PRODUCT_EXE}"
SectionEnd

Section "-Post"
  WriteUninstaller "$INSTDIR\Uninstall.exe"

  WriteRegStr HKLM "Software\${PRODUCT_NAME}" "InstallDir" "$INSTDIR"
  WriteRegStr HKLM "${PRODUCT_DIR_REGKEY}" "" "$INSTDIR\${PRODUCT_EXE}"
  WriteRegStr HKLM "${PRODUCT_DIR_REGKEY}" "Path" "$INSTDIR"

  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "DisplayName" "${PRODUCT_NAME}"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "DisplayVersion" "0.1.0.0"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "DisplayIcon" "$INSTDIR\${PRODUCT_EXE}"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "InstallLocation" "$INSTDIR"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "Publisher" "${PRODUCT_PUBLISHER}"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "URLInfoAbout" "${PRODUCT_WEB_SITE}"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "UninstallString" "$\"$INSTDIR\Uninstall.exe$\""
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "QuietUninstallString" "$\"$INSTDIR\Uninstall.exe$\" /S"

  SectionGetSize ${SEC_MAIN} $0
  WriteRegDWORD HKLM "${PRODUCT_UNINST_KEY}" "EstimatedSize" $0
SectionEnd

Function .onInit
  InitPluginsDir
  !insertmacro SingleInstanceMutex
  !insertmacro MUI_LANGDLL_DISPLAY
FunctionEnd

Function un.onInit
  InitPluginsDir
  !insertmacro SingleInstanceMutex
  MessageBox MB_ICONQUESTION|MB_YESNO|MB_DEFBUTTON2 "您确实要完全移除 $(^Name) ，及其所有的组件？" /SD IDYES IDYES +2
    Abort
FunctionEnd

!include sec_uninst.nsh

Function un.onUninstSuccess
  HideWindow
  MessageBox MB_ICONINFORMATION|MB_OK "$(^Name) 已成功地从您的计算机移除。" /SD IDOK
FunctionEnd

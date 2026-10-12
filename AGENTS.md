# Extension architecture

- This checkout is a prebuilt Manifest V3 extension, not a web-app scaffold; preserve its entry points and native CSES integration because it must load unpacked without a new build pipeline.
- Keep layout integration in the readable workspace-layout module and stylesheet, with minimal wiring in the shipped bundle; source maps predate custom editor changes and must not be used to regenerate the editor.
- Preserve CSES-provided navigation hrefs and authentication-dependent links; only the local Tests shortcut opens the existing console without navigating.
- Keep the development-only static preview and browser API shim under preview/; the manifest never loads them, so preview startup cannot alter real extension behavior.- The build script only copies the prebuilt extension and preview into dist/ (preview page as index/404) without transforming files, because hosting deploys dist/ while the extension must stay prebuilt.

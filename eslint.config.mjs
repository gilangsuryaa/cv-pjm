import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Panel admin memakai <img> secara sengaja, bukan karena kelalaian:
    // sumbernya berupa blob: URL hasil URL.createObjectURL (tidak didukung
    // next/image) dan signed URL yang tokennya berubah tiap render, sehingga
    // cache optimizer tidak pernah kena. Semuanya thumbnail berukuran tetap
    // di balik login, jadi alasan rule ini (LCP dan bandwidth pengunjung)
    // tidak berlaku. Halaman publik tetap diawasi rule ini seperti biasa.
    files: ["app/admin/**/*.tsx", "components/admin/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;

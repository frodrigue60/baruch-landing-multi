# Serves pre-built Astro SSG output (run `bun run build` on the host first).
# Avoids flaky native package installs inside Docker Desktop on Windows.
FROM nginx:1.27-alpine
COPY dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

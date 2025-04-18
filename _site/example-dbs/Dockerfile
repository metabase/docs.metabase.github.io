ARG VARIANT="latest"
FROM metabase/metabase:${VARIANT}

ARG MB_DB_FILE="./metabase.db.mv.db"
COPY ${MB_DB_FILE} /metabase.db/
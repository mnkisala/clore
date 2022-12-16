use std::net::SocketAddr;

use axum::{
    routing::{get, post},
    Json, Router,
};
use serde::Deserialize;

pub mod runner;

#[derive(Deserialize, Debug)]
pub struct RunPython {
    pub source_b64: String,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/", get(|| async { "hello world" }))
        .route("/run_python/", post(handle_run_python));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));

    tracing::debug!("listening on {}", &addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

pub async fn handle_run_python(program: Json<RunPython>) -> String {
    tracing::trace!("{:#?}", program);
    let src = String::from_utf8(base64::decode(&program.source_b64).unwrap()).unwrap();
    runner::run_python(&src).await
}

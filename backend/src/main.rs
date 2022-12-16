use std::net::SocketAddr;

use axum::{
    body::{Bytes, Full},
    http::{header::CONTENT_TYPE, Method},
    response::Response,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};

pub mod runner;

#[derive(Deserialize, Debug)]
pub struct RunPythonRequest {
    pub source_b64: String,
}

#[derive(Serialize, Debug)]
pub struct RunPythonResponse {
    pub stdout: String,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/", get(|| async { "hello world" }))
        .route("/run_python/", post(handle_run_python))
        .layer(
            tower_http::cors::CorsLayer::new()
                .allow_methods([Method::POST, Method::GET])
                .allow_origin(tower_http::cors::Any)
                .allow_headers([CONTENT_TYPE]),
        );

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));

    tracing::debug!("listening on {}", &addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

pub async fn handle_run_python(program: Json<RunPythonRequest>) -> Response<Full<Bytes>> {
    tracing::debug!("{:#?}", program);
    let src = String::from_utf8(base64::decode(&program.source_b64).unwrap()).unwrap();
    let json_str = serde_json::to_string(&RunPythonResponse {
        stdout: runner::run_python(&src).await,
    })
    .unwrap();

    Response::builder()
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Origin", "http://192.168.0.105:9000")
        .body(Full::from(json_str))
        .unwrap()
}

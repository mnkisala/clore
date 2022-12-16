use std::{process::Stdio, time::Duration};
use tokio::process::Command;

pub async fn run_python(src: &str) -> String {
    // TODO: this is probably not the most secure of the ways to run python under nsjail
    let mut cmd = Command::new("nsjail")
        .args(vec![
            "--chroot",
            "/",
            "--user",
            "99999",
            "--group",
            "99999",
            "--",
            "/usr/bin/python3",
        ])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::null())
        .spawn()
        .unwrap();

    use tokio::io::AsyncWriteExt;
    cmd.stdin
        .as_mut()
        .unwrap()
        .write_all(src.as_bytes())
        .await
        .unwrap();

    match tokio::time::timeout(Duration::from_secs(10), cmd.wait_with_output()).await {
        Ok(out) => std::str::from_utf8(&out.unwrap().stdout)
            .unwrap()
            .to_string(),
        Err(_) => "timeout".into(),
    }
}

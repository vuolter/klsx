use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use wasm_bindgen::JsValue;
use wasm_bindgen::prelude::*;

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ClsnValue {
    String(String),
    Number(f64),
    BigInt(i128),
    Bool(bool),
    Array(Vec<ClsnValue>),
    Map(HashMap<String, bool>),
    None,
}

fn _join(str_val: &mut String, str_to_add: &str) {
    if !str_val.is_empty() {
        str_val.push(' ');
    }
    str_val.push_str(str_to_add);
}

fn _kx(args: &[ClsnValue]) -> String {
    let mut str_val = String::new();

    for arg in args {
        if let ClsnValue::String(s) = arg {
            if !s.is_empty() {
                _join(&mut str_val, &s);
            }
        } else if let ClsnValue::Array(arr) = arg {
            let tmp = _kx(arr);
            if !tmp.is_empty() {
                _join(&mut str_val, &tmp);
            }
        } else if let ClsnValue::Map(map) = arg {
            for (key, val) in map {
                if *val {
                    _join(&mut str_val, key);
                }
            }
        }
    }

    str_val
}

#[wasm_bindgen]
pub fn kx(args: JsValue) -> Result<String, JsValue> {
    let deserialized_args: Vec<ClsnValue> = serde_wasm_bindgen::from_value(args)
        .map_err(|e| JsValue::from_str(&format!("Failed to deserialize: {}", e)))?;
    Ok(_kx(&deserialized_args))
}

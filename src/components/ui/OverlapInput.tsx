"use client";

import { Field, ErrorMessage, FieldProps } from "formik";
import React, { useState } from "react";
import { InputMask } from "@react-input/mask";
import Icon from "./Icon";
import classNames from "classnames";
import { IOverlapInputProps } from "@/types/props/ui.types";

export const phoneMaskOptions = {
    mask: "+998(__)___-__-__",
    replacement: { _: /\d/ },
};

export default function OverlapInput({
    id,
    placeholder,
    inputClass,
    name,
    disabled = false,
    maxLength = 25,
    minLength = 3,
    step,
    min,
    max,
    className,
}: IOverlapInputProps) {
    const [passwordType, setPasswordType] = useState<"password" | "text">("password");

    return (
        <div className={classNames("overlap-input", className)}>
            {name === "phone_number" ? (
                <Field name={name}>
                    {({ field }: FieldProps) => (
                        <InputMask
                            {...field}
                            placeholder=""
                            disabled={disabled}
                            id={`overlap-input-${id}`}
                            className={inputClass}
                            mask={phoneMaskOptions.mask}
                            replacement={phoneMaskOptions.replacement}
                            autoComplete="on"
                            type="text"
                            showMask
                        />
                    )}
                </Field>
            ) : name === "pin" ? (
                <Field name={name}>
                    {({ field }: FieldProps) => (
                        <InputMask
                            {...field}
                            placeholder=""
                            disabled={disabled}
                            id={`overlap-input-${id}`}
                            className={inputClass}
                            mask="____ ____ ____ ____"
                            replacement={{ _: /\d/ }}
                            autoComplete="on"
                            type="text"
                            showMask
                        />
                    )}
                </Field>
            ) : name === "expiry" ? (
                <Field name={name}>
                    {({ field }: FieldProps) => (
                        <InputMask
                            {...field}
                            placeholder=""
                            disabled={disabled}
                            id={`overlap-input-${id}`}
                            className={inputClass}
                            mask="__/__"
                            replacement={{ _: /\d/ }}
                            autoComplete="on"
                            type="text"
                            showMask
                        />
                    )}
                </Field>
            ) : name === "password" || name === "confirm_password" || name === "new_password" ? (
                <Field
                    name={name}
                    className={inputClass}
                    type={passwordType}
                    placeholder=""
                    id={`overlap-input-${id}`}
                    disabled={disabled}
                    minLength={minLength}
                    maxLength={maxLength}
                    autoComplete="on"
                />
            ) : name === "message" ? (
                <Field
                    name={name}
                    className={classNames("max-h-[15.625rem] min-h-[6.25rem]", inputClass)}
                    type="text"
                    placeholder=""
                    id={`overlap-input-${id}`}
                    disabled={disabled}
                    minLength={minLength}
                    maxLength={255}
                    autoComplete="on"
                    as="textarea"
                />
            ) : name === "cost" || name === "prepayment_percent" ? (
                <Field
                    name={name}
                    className={inputClass}
                    type="number"
                    placeholder=""
                    id={`overlap-input-${id}`}
                    disabled={disabled}
                    minLength={minLength}
                    maxLength={maxLength}
                    autoComplete="on"
                    step={step}
                    min={min}
                    max={max}
                />
            ) : (
                <Field
                    name={name}
                    className={inputClass}
                    type="text"
                    placeholder=""
                    id={`overlap-input-${id}`}
                    disabled={disabled}
                    minLength={minLength}
                    maxLength={maxLength}
                    autoComplete="on"
                />
            )}

            <label htmlFor={`overlap-input-${id}`}>{placeholder}</label>
            {(name === "password" || name === "confirm_password" || name === "new_password") && (
                <button
                    onClick={() => {
                        if (passwordType == "password") setPasswordType("text");
                        else setPasswordType("password");
                    }}
                    disabled={disabled}
                    type="button"
                    className="absolute right-[0.625rem] top-2 p-2">
                    <Icon className="text-secondary" name={passwordType === "password" ? "eye-off" : "eye"} />
                </button>
            )}
            <ErrorMessage name={name}>{(msg) => <p className="pl-1 text-xs text-red">{msg}</p>}</ErrorMessage>
        </div>
    );
}

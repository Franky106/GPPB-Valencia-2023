import { ITextFieldStyles, Stack, TextField } from '@fluentui/react';
import * as React from 'react';

export interface IColorNumberPicker {
    value?: number;
    editable?: boolean;
    onChange: (newValue?: number) => void;
}

export const ColorNumberPicker: React.FunctionComponent<IColorNumberPicker> = (props) => {

    const getBackgroundColor = (value: number) => {
        if (value < 0) {
            return '#fed9cc';
        } else if (value >= 0 && value < 10) {
            return '#fff4ce';
        } else {
            return '#dff6dd';
        }
    }

    const getFontColor = (value: number) => {
        if (value < 0) {
            return '#d83b01';
        } else if (value >= 0 && value < 10) {
            return '#797673';
        } else {
            return '#107c10';
        }
    }

    const textFieldStyles: Partial<ITextFieldStyles> = {
        field: {
            fontWeight: 700,
            color: props.value !== undefined ? getFontColor(props.value) : undefined,
            backgroundColor: props.value !== undefined ? getBackgroundColor(props.value) : undefined
        }
    }

    const onChange = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        
        if (newValue !== undefined && newValue !== '') {
            props.onChange(Number.parseInt(newValue));
        } else {
            props.onChange(undefined);
        }
    };

    return (
        <Stack>
            <TextField disabled={!props.editable} styles={textFieldStyles} type='number' value={props.value?.toString()} onChange={onChange} />
        </Stack>
    );
}
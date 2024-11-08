import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const InputField = ({ minUtility, setMinUtility, handleAnalyze, isLoading }) => {
    return (
        <div className="analyze-input-container">
            <Form inline>
                <Form.Group controlId="formMinUtility" className="mb-2 mr-sm-2">
                    <Form.Label className="mr-2">Nhập Min Utility</Form.Label>
                    <Form.Control
                        type="number"
                        value={minUtility}
                        onChange={(e) => setMinUtility(Number(e.target.value))}
                        placeholder="50000"
                        className="input-field"
                    />
                </Form.Group>
                <Button onClick={handleAnalyze} variant="primary" className="analyze-button">
                    Phân Tích
                </Button>
            </Form>
            {isLoading && (
                <Alert variant="info" className="mt-3">
                    Đang trong quá trình phân tích, vui lòng chờ...
                </Alert>
            )}
        </div>
    );
};

export default InputField;

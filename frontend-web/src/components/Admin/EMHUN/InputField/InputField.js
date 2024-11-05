import React from 'react';
import { Form, Button } from 'react-bootstrap';

const InputField = ({ minUtility, setMinUtility, handleAnalyze }) => {
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
        </div>
    );
};

export default InputField;

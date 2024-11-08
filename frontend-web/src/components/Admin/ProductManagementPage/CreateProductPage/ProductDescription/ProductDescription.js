import React from 'react';
import { Form } from 'react-bootstrap';

const ProductDescription = ({ descriptionVi, descriptionEn, handleChange }) => {
    return (
        <Form>
            <Form.Group controlId="descriptionVi">
                <Form.Label>Mô tả tiếng Việt</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name="descriptionVi"
                    placeholder="Nhập mô tả bằng tiếng Việt"
                    value={descriptionVi}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="descriptionEn" className="mt-3">
                <Form.Label>Mô tả tiếng Anh</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name="descriptionEn"
                    placeholder="Nhập mô tả bằng tiếng Anh"
                    value={descriptionEn}
                    onChange={handleChange}
                />
            </Form.Group>
        </Form>
    );
};

export default ProductDescription;

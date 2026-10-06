import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import {
  Button,
  Checkbox,
  Col,
  ComponentContainer,
  Form,
  Input,
  Row,
  Select,
  Title,
  Upload,
} from "../../../../components";
import {
  addProduct,
  fetchProduct,
  getProductId,
  updateProduct,
} from "../../../../firebase/collections/products";

export function ProductIntegration() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const isNew = productId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    if (isNew) {
      setProduct({
        id: getProductId(),
        sku: "",
        barcode: "",
        name: "",
        brand: "",
        model: "",
        categoryId: "",
        imageUrl: null,
        isActive: true,
      });
    } else {
      const fetchProductData = async () => {
        try {
          const _product = await fetchProduct(productId as string);
          if (!_product) {
            navigate(-1);
            return;
          }
          setProduct(_product);
        } catch (error) {
          console.error("Error obteniendo el producto:", error);
          navigate(-1);
        }
      };
      fetchProductData();
    }
  }, [productId, isNew, navigate]);

  const mapProduct = (formData: any) => ({
    ...product,
    sku: formData.sku.trim(),
    barcode: formData.barcode.trim(),
    name: formData.name,
    brand: formData.brand,
    model: formData.model,
    categoryId: formData.categoryId,
    imageUrl: formData.imageUrl,
    isActive: formData.isActive,
  });

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);

      isNew
        ? await addProduct(assignCreateProps(mapProduct(formData)))
        : await updateProduct(
            productId as string,
            assignUpdateProps(mapProduct(formData))
          );

      navigate("/inventory/products");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Product
      product={product}
      loading={loading}
      isNew={isNew}
      onSubmit={onSubmit}
      onGoBack={onGoBack}
    />
  );
}

export const Product = ({
  product,
  loading,
  isNew,
  onSubmit,
  onGoBack,
}: any) => {
  const schema = yup.object({
    name: yup.string().required("El nombre es obligatorio"),
    sku: yup.string().required("El SKU es obligatorio"),
    barcode: yup.string().optional(),
    brand: yup.string().optional(),
    model: yup.string().optional(),
    categoryId: yup.string().required("La categoría es obligatoria"),
    imageUrl: yup.object().nullable().optional(),
    isActive: yup.boolean().default(true),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  // Lista hardcodeada para el ejemplo, pero aquí podrías usar fetchCategories
  const categoryOptions = [
    { label: "Laptops", value: "cat_laptops" },
    { label: "Periféricos", value: "cat_perifericos" },
    { label: "Servidores", value: "cat_servidores" },
  ];

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        sku: product.sku,
        barcode: product.barcode,
        brand: product.brand,
        model: product.model,
        categoryId: product.categoryId,
        imageUrl: product.imageUrl || null,
        isActive: product.isActive,
      });
    }
  }, [product, reset]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={2}>{isNew ? "Nuevo" : "Editar"} Producto</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ComponentContainer.group label="Información General">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Nombre del Producto"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={6}>
                    <Controller
                      name="sku"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="SKU"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={6}>
                    <Controller
                      name="barcode"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Código de Barras"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </ComponentContainer.group>
            </Col>

            <Col span={24}>
              <ComponentContainer.group label="Clasificación y Detalles">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Controller
                      name="categoryId"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Select
                          label="Categoría"
                          name={name}
                          value={value}
                          onChange={onChange}
                          options={categoryOptions}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Controller
                      name="brand"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Marca"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Controller
                      name="model"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Modelo"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </ComponentContainer.group>
            </Col>

            <Col span={24}>
              <ComponentContainer.group label="Multimedia y Estado">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Controller
                      name="imageUrl"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Upload
                          isImage
                          label="Fotografía del Producto (800x800 recomendada)"
                          accept="image/*"
                          buttonText="Subir imagen"
                          value={value}
                          name={name}
                          filePath={`products/${product?.id}/images`}
                          fileName="main-image"
                          onChange={(file) => onChange(file)}
                          required={required(name)}
                          error={error(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div style={{ marginTop: "1rem" }}>
                          <Checkbox
                            checked={value}
                            onChange={(e: any) => onChange(e.target.checked)}
                          >
                            Producto Activo en el sistema
                          </Checkbox>
                        </div>
                      )}
                    />
                  </Col>
                </Row>
              </ComponentContainer.group>
            </Col>

            <Col span={24}>
              <Row justify="end" gutter={[16, 16]}>
                <Col xs={24} sm={6} md={4}>
                  <Button
                    type="default"
                    size="large"
                    block
                    onClick={onGoBack}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </Col>
                <Col xs={24} sm={6} md={4}>
                  <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    loading={loading}
                  >
                    {isNew ? "Crear Producto" : "Guardar Cambios"}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

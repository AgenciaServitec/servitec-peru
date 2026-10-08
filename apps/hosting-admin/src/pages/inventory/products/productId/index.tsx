import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import {
  Button,
  Col,
  ComponentContainer,
  Form,
  Input,
  Row,
  Select,
  TextArea,
  Title,
  Upload,
} from "../../../../components";
import {
  addProduct,
  fetchProduct,
  getProductId,
  updateProduct,
} from "../../../../firebase/collections/products";
import { Image, QRCode, Space, Switch, Typography } from "antd";
import styled, { css } from "styled-components";
import JsBarcode from "jsbarcode";
import { Download, GripVertical, Star, Trash2 } from "lucide-react";

// Dependencias de @dnd-kit
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const { Text } = Typography;

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
        description: "",
        brand: "",
        model: "",
        categoryId: "",
        gallery: [],
        costPrice: 0,
        salePrice: 0,
        stock: 0,
        minStock: 0,
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

  const mapProduct = (formData: any) => {
    const gallery = formData.gallery || [];
    const imageUrl = gallery.length > 0 ? gallery[0] : null;

    return {
      ...product,
      sku: formData.sku.trim(),
      barcode: formData.barcode?.trim() || "",
      name: formData.name,
      description: formData.description || "",
      brand: formData.brand || "",
      model: formData.model || "",
      categoryId: formData.categoryId,
      imageUrl,
      gallery,
      costPrice: Number(formData.costPrice || 0),
      salePrice: Number(formData.salePrice || 0),
      stock: Number(formData.stock || 0),
      minStock: Number(formData.minStock || 0),
      isActive: formData.isActive,
    };
  };

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
    description: yup.string().optional(),
    sku: yup.string().required("El SKU es obligatorio"),
    barcode: yup.string().optional(),
    brand: yup.string().optional(),
    model: yup.string().optional(),
    categoryId: yup.string().required("La categoría es obligatoria"),
    costPrice: yup
      .number()
      .typeError("Debe ser un número")
      .min(0, "El costo no puede ser negativo")
      .optional(),
    salePrice: yup
      .number()
      .typeError("Debe ser un número")
      .min(0, "El precio no puede ser negativo")
      .optional(),
    stock: yup
      .number()
      .typeError("Debe ser un número")
      .min(0, "El stock no puede ser negativo")
      .optional(),
    minStock: yup
      .number()
      .typeError("Debe ser un número")
      .min(0, "El stock mínimo no puede ser negativo")
      .optional(),
    gallery: yup.array().optional(),
    isActive: yup.boolean().default(true),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const watchSku = watch("sku");
  const watchBarcode = watch("barcode");
  const barcodeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const qrContainerRef = useRef<HTMLDivElement | null>(null);

  const categoryOptions = [
    { label: "Laptops", value: "cat_laptops" },
    { label: "Periféricos", value: "cat_perifericos" },
    { label: "Servidores", value: "cat_servidores" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        sku: product.sku,
        barcode: product.barcode,
        brand: product.brand,
        model: product.model,
        categoryId: product.categoryId,
        costPrice: product.costPrice,
        salePrice: product.salePrice,
        stock: product.stock,
        minStock: product.minStock,
        gallery: product.gallery || [],
        isActive: product.isActive,
      });
    }
  }, [product, reset]);

  // Renderizado de JsBarcode
  useEffect(() => {
    const codeToRender = watchBarcode || watchSku;
    if (barcodeCanvasRef.current && codeToRender) {
      try {
        JsBarcode(barcodeCanvasRef.current, codeToRender, {
          format: "CODE128",
          lineColor: "#FFFFFF",
          background: "transparent",
          width: 2,
          height: 50,
          displayValue: true,
          fontSize: 12,
          textColor: "#9CA3AF",
        });
      } catch (err) {
        console.warn("Código no válido para JsBarcode", err);
      }
    }
  }, [watchBarcode, watchSku]);

  // Función de Descarga del Código de Barras (Canvas a PNG)
  const downloadBarcode = () => {
    if (!barcodeCanvasRef.current) return;
    const link = document.createElement("a");
    link.download = `barcode-${watchBarcode || watchSku || "code"}.png`;
    link.href = barcodeCanvasRef.current.toDataURL("image/png");
    link.click();
  };

  // Función de Descarga del Código QR (Canvas a PNG)
  const downloadQR = () => {
    if (!qrContainerRef.current) return;
    const canvas = qrContainerRef.current.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = `qr-${watchBarcode || watchSku || "code"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <PageWrapper>
      <Row gutter={[24, 24]} style={{ width: "100%", margin: 0 }}>
        {/* Header de la página */}
        <Col span={24} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div style={{ marginBottom: 8 }}>
            <Title level={2} style={{ marginBottom: 4 }}>
              {isNew ? "Nuevo Producto" : "Editar Producto"}
            </Title>
            <Text type="secondary">
              {isNew
                ? "Registra un nuevo ítem en el catálogo general de tu inventario."
                : "Actualiza la información general, precios y clasificación del producto."}
            </Text>
          </div>
        </Col>

        <Col span={24} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[24, 24]}>
              {/* COLUMNA IZQUIERDA: Información Principal, Precios, Identificadores, Estado y Etiquetas */}
              <Col xs={24} lg={15} xl={16}>
                <Row gutter={[16, 16]}>
                  {/* Información General */}
                  <Col span={24}>
                    <ComponentContainer.group label="Información Principal">
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
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
                        <Col span={24}>
                          <Controller
                            name="description"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <TextArea
                                label="Descripción Corta"
                                name={name}
                                rows={3}
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

                  {/* Precios e Inventario */}
                  <Col span={24}>
                    <ComponentContainer.group label="Precios e Inventario Inicial">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={6}>
                          <Controller
                            name="costPrice"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Precio Costo"
                                name={name}
                                type="number"
                                value={value}
                                onChange={onChange}
                                error={error(name)}
                                required={required(name)}
                              />
                            )}
                          />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Controller
                            name="salePrice"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Precio Venta"
                                name={name}
                                type="number"
                                value={value}
                                onChange={onChange}
                                error={error(name)}
                                required={required(name)}
                              />
                            )}
                          />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Controller
                            name="stock"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Stock Inicial"
                                name={name}
                                type="number"
                                value={value}
                                onChange={onChange}
                                error={error(name)}
                                required={required(name)}
                              />
                            )}
                          />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Controller
                            name="minStock"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Stock Mínimo"
                                name={name}
                                type="number"
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

                  {/* Identificadores */}
                  <Col span={24}>
                    <ComponentContainer.group label="Identificadores y Códigos">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <Controller
                            name="sku"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="SKU (Código Interno)"
                                name={name}
                                value={value}
                                onChange={onChange}
                                error={error(name)}
                                required={required(name)}
                              />
                            )}
                          />
                        </Col>
                        <Col xs={24} md={12}>
                          <Controller
                            name="barcode"
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                              <Input
                                label="Código de Barras (EAN / UPC)"
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

                  {/* Estado de Venta */}
                  <Col span={24}>
                    <ComponentContainer.group label="Estado de Venta">
                      <Controller
                        name="isActive"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Space
                            align="center"
                            style={{
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text>Producto Activo en el sistema</Text>
                            <Switch
                              checked={value}
                              onChange={(checked) => onChange(checked)}
                            />
                          </Space>
                        )}
                      />
                    </ComponentContainer.group>
                  </Col>

                  {/* Contenedor Estético para Códigos e Impresión */}
                  <Col span={24}>
                    <ComponentContainer.group label="Generador de Etiquetas de Producto">
                      <LabelsGrid>
                        {/* Card Código de Barras */}
                        <CodeCard>
                          <div className="card-head">
                            <span>Código de Barras (CODE128)</span>
                            <button
                              type="button"
                              className="download-btn"
                              onClick={downloadBarcode}
                              title="Descargar Código de Barras"
                            >
                              <Download size={14} /> Descargar
                            </button>
                          </div>
                          <div className="code-display">
                            <canvas ref={barcodeCanvasRef} />
                          </div>
                        </CodeCard>

                        {/* Card QR */}
                        <CodeCard ref={qrContainerRef}>
                          <div className="card-head">
                            <span>Código QR de Producto</span>
                            <button
                              type="button"
                              className="download-btn"
                              onClick={downloadQR}
                              title="Descargar Código QR"
                            >
                              <Download size={14} /> Descargar
                            </button>
                          </div>
                          <div className="code-display">
                            <QRCode
                              value={
                                watchBarcode || watchSku || product?.id || "N/A"
                              }
                              size={110}
                              bordered={false}
                            />
                          </div>
                        </CodeCard>
                      </LabelsGrid>
                    </ComponentContainer.group>
                  </Col>
                </Row>
              </Col>

              {/* COLUMNA DERECHA: Galería Única con Drag & Drop */}
              <Col xs={24} lg={9} xl={8}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <ComponentContainer.group label="Imágenes del Producto">
                      <Controller
                        name="gallery"
                        control={control}
                        render={({ field: { onChange, value = [] } }) => {
                          const handleDragEnd = (event: DragEndEvent) => {
                            const { active, over } = event;
                            if (over && active.id !== over.id) {
                              const oldIndex = value.findIndex(
                                (item: any) =>
                                  (item.url || item.uid || item) === active.id
                              );
                              const newIndex = value.findIndex(
                                (item: any) =>
                                  (item.url || item.uid || item) === over.id
                              );
                              onChange(arrayMove(value, oldIndex, newIndex));
                            }
                          };

                          const handleRemoveImage = (indexToRemove: number) => {
                            const newGallery = value.filter(
                              (_: any, index: number) => index !== indexToRemove
                            );
                            onChange(newGallery);
                          };

                          return (
                            <GalleryContainer>
                              <Upload
                                isImage
                                multiple
                                label="Carga de fotos (Primera foto es Portada)"
                                accept="image/*"
                                buttonText="Subir fotos"
                                filePath={`products/${product?.id}/gallery`}
                                fileName="gallery"
                                onChange={(newFiles) => {
                                  const updated = Array.isArray(newFiles)
                                    ? [...value, ...newFiles]
                                    : [...value, newFiles];
                                  onChange(updated);
                                }}
                              />

                              {value.length > 0 && (
                                <Image.PreviewGroup>
                                  <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                  >
                                    <SortableContext
                                      items={value.map(
                                        (item: any, idx: number) =>
                                          item.url || item.uid || `img-${idx}`
                                      )}
                                      strategy={rectSortingStrategy}
                                    >
                                      <GridGallery>
                                        {value.map(
                                          (item: any, index: number) => {
                                            const itemId =
                                              item.url ||
                                              item.uid ||
                                              `img-${index}`;
                                            const srcUrl =
                                              item.thumbUrl ||
                                              item.url ||
                                              (typeof item === "string"
                                                ? item
                                                : "");

                                            return (
                                              <SortableImageItem
                                                key={itemId}
                                                id={itemId}
                                                src={srcUrl}
                                                isMain={index === 0}
                                                onRemove={() =>
                                                  handleRemoveImage(index)
                                                }
                                              />
                                            );
                                          }
                                        )}
                                      </GridGallery>
                                    </SortableContext>
                                  </DndContext>
                                </Image.PreviewGroup>
                              )}
                            </GalleryContainer>
                          );
                        }}
                      />
                    </ComponentContainer.group>
                  </Col>
                </Row>
              </Col>

              {/* Botones de Acción */}
              <Col span={24} style={{ marginTop: 8 }}>
                <Row justify="end" gutter={[16, 16]}>
                  <Col xs={12} sm={6} md={4}>
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
                  <Col xs={12} sm={6} md={4}>
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
    </PageWrapper>
  );
};

/* --- COMPONENTE INDIVIDUAL DRAGGABLE PARA GALERÍA --- */

interface SortableItemProps {
  id: string;
  src: string;
  isMain?: boolean;
  onRemove: () => void;
}

const SortableImageItem = ({
  id,
  src,
  isMain,
  onRemove,
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ImageCardItem ref={setNodeRef} style={style} $isMain={isMain}>
      {isMain && (
        <div className="main-badge" title="Imagen de Portada">
          <Star size={10} fill="#ffffff" /> Portada
        </div>
      )}

      <div className="drag-handle" {...attributes} {...listeners}>
        <GripVertical size={14} />
      </div>

      <Image
        src={src}
        alt="gallery preview"
        wrapperStyle={{ width: "100%", height: "100%" }}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />

      <button
        type="button"
        className="remove-btn"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <Trash2 size={13} />
      </button>
    </ImageCardItem>
  );
};

/* --- ESTILOS SÓLIDOS Y ESTRUCTURA LIMPIA --- */

const PageWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
`;

const GalleryContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
  `}
`;

const GridGallery = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: ${theme.spacing.xs};
    margin-top: ${theme.spacing.xs};
  `}
`;

const ImageCardItem = styled.div<{ $isMain?: boolean }>`
  ${({ theme, $isMain }) => css`
    position: relative;
    width: 100%;
    height: 90px;
    border-radius: ${theme.border_radius.md};
    overflow: hidden;
    border: 1px solid ${$isMain ? theme.colors.primary : theme.colors.border};
    background: ${theme.colors.bgSecondary};

    .main-badge {
      position: absolute;
      bottom: 4px;
      left: 4px;
      z-index: 10;
      background: ${theme.colors.primary};
      color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
      font-size: 10px;
      font-weight: ${theme.font_weight.semibold};
      padding: 1px 6px;
      border-radius: ${theme.border_radius.xs};
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .drag-handle {
      position: absolute;
      top: 4px;
      left: 4px;
      z-index: 10;
      background: rgba(0, 0, 0, 0.65);
      color: #ffffff;
      border-radius: ${theme.border_radius.xs};
      padding: 2px;
      cursor: grab;
      display: flex;
      align-items: center;
      justify-content: center;

      &:active {
        cursor: grabbing;
      }
    }

    .remove-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      z-index: 10;
      background: ${theme.colors.error};
      color: #ffffff;
      border: none;
      border-radius: ${theme.border_radius.xs};
      padding: 3px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity ${theme.transitions.fast};

      &:hover {
        opacity: 0.85;
      }
    }
  `}
`;

const LabelsGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${theme.spacing.md};
  `}
`;

const CodeCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.md};
    padding: ${theme.spacing.md};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};

    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: ${theme.font_sizes.xs};
        font-weight: ${theme.font_weight.medium};
        color: ${theme.colors.fontSecondary};
      }

      .download-btn {
        background: ${theme.colors.bgHover};
        border: 1px solid ${theme.colors.border};
        color: ${theme.colors.fontPrimary};
        font-size: 11px;
        font-weight: ${theme.font_weight.medium};
        padding: 3px 8px;
        border-radius: ${theme.border_radius.xs};
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        transition: background ${theme.transitions.fast};

        &:hover {
          background: ${theme.colors.borderHover};
        }
      }
    }

    .code-display {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 110px;
      background: ${theme.colors.bgPrimary};
      border-radius: ${theme.border_radius.sm};
      padding: ${theme.spacing.xs};
      overflow: hidden;

      canvas {
        max-width: 100%;
      }
    }
  `}
`;

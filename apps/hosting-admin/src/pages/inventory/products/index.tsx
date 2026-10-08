import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Input, Row, Select, Title } from "../../../components";
import {
  deleteProduct,
  fetchProducts,
} from "../../../firebase/collections/products";
import { Image, Modal, Spin, Typography } from "antd";
import styled, { css } from "styled-components";
import {
  AlertTriangle,
  Edit,
  Package,
  Plus,
  Search,
  Tag,
  Trash2,
} from "lucide-react";

const { Text } = Typography;

// Datos de simulación para pruebas visuales
const MOCK_PRODUCTS = [
  {
    id: "prod_001",
    name: "Laptop ThinkPad E14 Gen 4",
    sku: "LNK-E14-G4",
    barcode: "7751234567890",
    brand: "Lenovo",
    model: "ThinkPad E14",
    categoryId: "cat_laptops",
    salePrice: 3899.0,
    costPrice: 2950.0,
    stock: 12,
    minStock: 5,
    isActive: true,
    imageUrl:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: "prod_002",
    name: "Monitor Gamer Odyssey G5 27 QHD",
    sku: "SAM-ODYS-G5",
    barcode: "8806091234567",
    brand: "Samsung",
    model: "G55T",
    categoryId: "cat_perifericos",
    salePrice: 1250.0,
    costPrice: 890.0,
    stock: 3,
    minStock: 5,
    isActive: true,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: "prod_003",
    name: "Servidor PowerEdge T350 Xeon E-2314",
    sku: "DELL-T350-XE",
    barcode: "7891011121314",
    brand: "Dell",
    model: "PowerEdge T350",
    categoryId: "cat_servidores",
    salePrice: 8450.0,
    costPrice: 6200.0,
    stock: 2,
    minStock: 1,
    isActive: true,
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: "prod_004",
    name: "Teclado Mecánico MX Keys Mini",
    sku: "LOG-MX-MINI",
    barcode: "5099206091234",
    brand: "Logitech",
    model: "MX Keys",
    categoryId: "cat_perifericos",
    salePrice: 420.0,
    costPrice: 280.0,
    stock: 0,
    minStock: 4,
    isActive: false,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=60",
  },
];

export function ProductsIntegrations() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const categoryOptions = [
    { label: "Todas las Categorías", value: "all" },
    { label: "Laptops", value: "cat_laptops" },
    { label: "Periféricos", value: "cat_perifericos" },
    { label: "Servidores", value: "cat_servidores" },
  ];

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        // Fallback a MOCK_PRODUCTS para simulación
        setProducts(MOCK_PRODUCTS);
      }
    } catch (error) {
      console.error("Error al cargar productos, cargando simulación:", error);
      setProducts(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateNew = () => {
    navigate("/inventory/products/new");
  };

  const handleEdit = (productId: string) => {
    navigate(`/inventory/products/${productId}`);
  };

  const handleConfirmDelete = (product: any) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const executeDelete = async () => {
    if (!productToDelete) return;
    try {
      setDeleting(true);
      await deleteProduct(productToDelete.id, productToDelete);
      setDeleteModalVisible(false);
      setProductToDelete(null);
      await loadProducts();
    } catch (error) {
      console.error("Error eliminando producto:", error);
      // Simulación local en caso de fallo
      setProducts((prev) =>
        prev.map((item) =>
          item.id === productToDelete.id ? { ...item, isActive: false } : item
        )
      );
      setDeleteModalVisible(false);
      setProductToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barcode?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper>
      <Row gutter={[24, 24]} style={{ width: "100%", margin: 0 }}>
        {/* Encabezado */}
        <Col span={24} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <HeaderFlex>
            <div>
              <Title level={2} style={{ marginBottom: 4 }}>
                Catálogo de Productos
              </Title>
              <Text type="secondary">
                Gestiona y monitorea los productos registrados en tu inventario
                general.
              </Text>
            </div>
            <Button
              type="primary"
              size="large"
              onClick={handleCreateNew}
              icon={<Plus size={18} />}
            >
              Nuevo Producto
            </Button>
          </HeaderFlex>
        </Col>

        {/* Filtros y Búsqueda */}
        <Col span={24} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <FiltersContainer>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={12} lg={10}>
                <Input
                  placeholder="Buscar por nombre, SKU, marca o código de barras..."
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                  prefix={<Search size={16} style={{ opacity: 0.6 }} />}
                />
              </Col>
              <Col xs={24} md={8} lg={6}>
                <Select
                  value={selectedCategory}
                  onChange={(val) => setSelectedCategory(val)}
                  options={categoryOptions}
                />
              </Col>
            </Row>
          </FiltersContainer>
        </Col>

        {/* Lista de Tarjetas */}
        <Col span={24} style={{ paddingLeft: 0, paddingRight: 0 }}>
          {loading ? (
            <LoadingBox>
              <Spin size="large" />
            </LoadingBox>
          ) : filteredProducts.length === 0 ? (
            <EmptyBox>
              <Package size={48} strokeWidth={1.5} />
              <p className="empty-title">No se encontraron productos</p>
              <p className="empty-sub">
                Intenta ajustando los filtros de búsqueda o registra un nuevo
                producto.
              </p>
            </EmptyBox>
          ) : (
            <GridContainer>
              {filteredProducts.map((prod) => {
                const coverUrl =
                  prod.imageUrl?.url ||
                  prod.imageUrl ||
                  (Array.isArray(prod.gallery) && prod.gallery[0]?.url) ||
                  (Array.isArray(prod.gallery) && prod.gallery[0]) ||
                  null;

                const isLowStock =
                  Number(prod.stock || 0) <= Number(prod.minStock || 0);

                return (
                  <ProductCard key={prod.id}>
                    {/* Badge de Estado */}
                    <CardHeaderBadge $isActive={prod.isActive}>
                      {prod.isActive ? "Activo" : "Inactivo"}
                    </CardHeaderBadge>

                    {/* Imagen / Portada */}
                    <ImageWrapper>
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={prod.name}
                          wrapperStyle={{ width: "100%", height: "100%" }}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      ) : (
                        <NoImagePlaceholder>
                          <Package size={32} />
                          <span>Sin Imagen</span>
                        </NoImagePlaceholder>
                      )}
                    </ImageWrapper>

                    {/* Contenido principal */}
                    <CardBody>
                      <BrandModelRow>
                        <span>{prod.brand || "Sin Marca"}</span>
                        {prod.model && <span>• {prod.model}</span>}
                      </BrandModelRow>

                      <ProductTitle title={prod.name}>{prod.name}</ProductTitle>

                      <SkuBar>
                        <Tag size={12} />
                        <span>SKU: {prod.sku || "N/A"}</span>
                      </SkuBar>

                      <PricesGrid>
                        <PriceBlock>
                          <span className="price-label">Precio Venta</span>
                          <span className="price-value">
                            S/ {Number(prod.salePrice || 0).toFixed(2)}
                          </span>
                        </PriceBlock>
                        <PriceBlock>
                          <span className="price-label">Costo</span>
                          <span className="price-sub">
                            S/ {Number(prod.costPrice || 0).toFixed(2)}
                          </span>
                        </PriceBlock>
                      </PricesGrid>

                      <StockBadge $isLow={isLowStock}>
                        <span className="stock-info">
                          Stock: <strong>{prod.stock || 0}</strong> un.
                        </span>
                        {isLowStock && (
                          <span
                            className="low-warning"
                            title="Stock por debajo del mínimo"
                          >
                            <AlertTriangle size={12} /> Mín:{" "}
                            {prod.minStock || 0}
                          </span>
                        )}
                      </StockBadge>
                    </CardBody>

                    {/* Botones de Acción */}
                    <CardActions>
                      <button
                        type="button"
                        className="action-btn edit"
                        onClick={() => handleEdit(prod.id)}
                      >
                        <Edit size={14} /> Editar
                      </button>
                      <button
                        type="button"
                        className="action-btn delete"
                        onClick={() => handleConfirmDelete(prod)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </CardActions>
                  </ProductCard>
                );
              })}
            </GridContainer>
          )}
        </Col>
      </Row>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        title="Desactivar / Eliminar Producto"
        open={deleteModalVisible}
        onOk={executeDelete}
        onCancel={() => setDeleteModalVisible(false)}
        confirmLoading={deleting}
        okText="Sí, Desactivar"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
      >
        <p>
          ¿Estás seguro de que deseas desactivar el producto{" "}
          <strong>"{productToDelete?.name}"</strong>?
        </p>
        <p style={{ fontSize: 12, opacity: 0.7 }}>
          El producto pasará a estado inactivo en tu inventario.
        </p>
      </Modal>
    </PageWrapper>
  );
}

/* --- ESTILOS RESPONSIVOS Y ESTRUCTURA SÓLIDA --- */

const PageWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
`;

const HeaderFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const FiltersContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.md};
    padding: ${theme.spacing.md};
  `}
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 280px;
`;

const EmptyBox = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.xl}${theme.spacing.md};
    background: ${theme.colors.bgSecondary};
    border: 1px dashed ${theme.colors.border};
    border-radius: ${theme.border_radius.md};
    color: ${theme.colors.fontTertiary};
    text-align: center;

    .empty-title {
      font-size: ${theme.font_sizes.md};
      font-weight: ${theme.font_weight.semibold};
      color: ${theme.colors.fontPrimary};
      margin: ${theme.spacing.xs} 0 0 0;
    }

    .empty-sub {
      font-size: ${theme.font_sizes.sm};
      margin-top: 4px;
    }
  `}
`;

const GridContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: ${theme.spacing.md};
  `}
`;

const ProductCard = styled.div`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.md};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition:
      border-color ${theme.transitions.fast},
      transform ${theme.transitions.fast};

    &:hover {
      border-color: ${theme.colors.borderHover};
    }
  `}
`;

const CardHeaderBadge = styled.div<{ $isActive?: boolean }>`
  ${({ theme, $isActive }) => css`
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;
    font-size: 10px;
    font-weight: ${theme.font_weight.semibold};
    padding: 2px 8px;
    border-radius: ${theme.border_radius.xs};
    background: ${$isActive ? theme.colors.success : theme.colors.error};
    color: #ffffff;
  `}
`;

const ImageWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 160px;
    background: ${theme.colors.bgPrimary};
    border-bottom: 1px solid ${theme.colors.border};
    position: relative;
    overflow: hidden;
  `}
`;

const NoImagePlaceholder = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.xs};
    color: ${theme.colors.fontTertiary};

    span {
      font-size: ${theme.font_sizes.xs};
    }
  `}
`;

const CardBody = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.md};
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: ${theme.spacing.xs};
  `}
`;

const BrandModelRow = styled.div`
  ${({ theme }) => css`
    font-size: 11px;
    font-weight: ${theme.font_weight.medium};
    color: ${theme.colors.fontTertiary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `}
`;

const ProductTitle = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.semibold};
    color: ${theme.colors.fontPrimary};
    margin: 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

const SkuBar = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: ${theme.colors.fontSecondary};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

const PricesGrid = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-top: ${theme.spacing.xs};
    border-top: 1px solid ${theme.colors.divider};
  `}
`;

const PriceBlock = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    .price-label {
      font-size: 10px;
      color: ${theme.colors.fontTertiary};
    }

    .price-value {
      font-size: ${theme.font_sizes.md};
      font-weight: ${theme.font_weight.bold};
      color: ${theme.colors.primary};
    }

    .price-sub {
      font-size: ${theme.font_sizes.xs};
      color: ${theme.colors.fontSecondary};
    }
  `}
`;

const StockBadge = styled.div<{ $isLow?: boolean }>`
  ${({ theme, $isLow }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${theme.colors.bgPrimary};
    padding: 4px 8px;
    border-radius: ${theme.border_radius.xs};
    font-size: 11px;
    margin-top: ${theme.spacing.xs};
    border: 1px solid ${$isLow ? theme.colors.error : theme.colors.border};

    .stock-info {
      color: ${theme.colors.fontPrimary};
    }

    .low-warning {
      display: flex;
      align-items: center;
      gap: 3px;
      color: ${theme.colors.error};
      font-weight: ${theme.font_weight.medium};
    }
  `}
`;

const CardActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border-top: 1px solid ${theme.colors.border};
    background: ${theme.colors.bgPrimary};

    .action-btn {
      flex: 1;
      height: 36px;
      background: transparent;
      border: none;
      color: ${theme.colors.fontSecondary};
      font-size: 12px;
      font-weight: ${theme.font_weight.medium};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition:
        background ${theme.transitions.fast},
        color ${theme.transitions.fast};

      &:hover {
        background: ${theme.colors.bgHover};
        color: ${theme.colors.fontPrimary};
      }

      &.edit {
        border-right: 1px solid ${theme.colors.border};
      }

      &.delete:hover {
        color: ${theme.colors.error};
      }
    }
  `}
`;

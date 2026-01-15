import { useState, useMemo } from "react";
import { AutoComplete, Input, Button } from "../ui";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export const AddressSearchInput = ({
  value,
  onChange,
  onSelect,
  error,
  required,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const provider = useMemo(
    () =>
      new OpenStreetMapProvider({
        params: {
          countrycodes: "pe",
          addressdetails: 1,
        },
      }),
    []
  );

  const handleSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (!query || query.length < 5) return;

        setLoading(true);
        try {
          const results = await provider.search({ query });

          setOptions(
            results.map((item) => ({
              value: item.label,
              label: (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ color: "#bfbfbf" }}
                  />
                  <span style={{ fontSize: "13px" }}>{item.label}</span>
                </div>
              ),
              lat: item.y,
              lon: item.x,
            }))
          );
        } catch (e) {
          console.error("Error en Geosearch:", e);
        } finally {
          setLoading(false);
        }
      }, 800),
    [provider]
  );

  return (
    <AutoComplete
      options={options}
      onSelect={(val, option) => onSelect(option)}
      value={value}
      onChange={(val) => {
        onChange(val);
        handleSearch(val);
      }}
      style={{ width: "100%" }}
    >
      <Input
        label="Dirección / Referencia"
        error={error}
        required={required}
        suffix={
          <Button
            type="text"
            loading={loading}
            icon={
              !loading && (
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ color: value?.length >= 5 ? "#1890ff" : "#bfbfbf" }}
                />
              )
            }
            onClick={() => handleSearch(value)}
          />
        }
      />
    </AutoComplete>
  );
};

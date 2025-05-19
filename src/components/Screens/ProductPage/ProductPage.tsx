import styles from "./ProductPage.module.css";
import ZapatillaPrueba from "../../../assets/img/ZapatillaPrueba.png";
import { Carrusel } from "../../UI/Carrusel/Carrusel";

export const ProductPage = () => {
  return (
    <div className={styles.productPageContainer}>
      <div className={styles.mainContentContainer}>
        <div className={styles.productImagesContainer}>
          <img src={ZapatillaPrueba} alt="Zapatilla" />
          <img src={ZapatillaPrueba} alt="Zapatilla" />
          <img src={ZapatillaPrueba} alt="Zapatilla" />
          <img src={ZapatillaPrueba} alt="Zapatilla" />
        </div>

        <div className={styles.productContainer}>
          <img src={ZapatillaPrueba} alt="Zapatilla" />
        </div>

        <div className={styles.infoProductContainer}>
          <h1 style={{ fontFamily: "LatoBold" }}>Giannis Freak 6</h1>
          <h3>Zapatillas de Básquet para Hombre</h3>
          <br />
          <p>$199.999</p>
          <h4>Hasta 6x $43.333 sin interés</h4>

          <div className={styles.infoProductImagesContainer}>
            <img src={ZapatillaPrueba} alt="Zapatilla" />
            <img src={ZapatillaPrueba} alt="Zapatilla" />
          </div>

          <h3>Seleccionar Talle</h3>
          <hr />

          <div className={styles.infoProductTalleContainer}>
            <p>29</p>
            <p>30</p>
            <p>31</p>
            <p>32</p>
            <p>33</p>
            <p>34</p>
            <p>35</p>
            <p>36</p>
            <p>37</p>
            <p>38</p>
            <p>39</p>
            <p>40</p>
            <p>41</p>
            <p>42</p>
            <p>43</p>
            <p>44</p>
            <p>45</p>
            <p>46</p>
            <p>47</p>
          </div>

          <button>AGREGAR AL CARRITO</button>
        </div>
      </div>

      <div className={styles.productosSimilaresContainer}>
        <h2>Productos Similares</h2>
        <hr />

        <Carrusel />
      </div>
    </div>
  );
};

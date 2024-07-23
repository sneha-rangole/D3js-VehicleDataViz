

# Data Visualization with D3.js - Car Clustering Based on Origin and Cylinders

This project involves creating interactive visualizations of car data using D3.js. The primary task was to cluster cars based on their origin and the number of cylinders, and to visualize these clusters with interactive features.

## Methodology

### Dataset Selection and Preprocessing

#### Dataset

- **Car Dataset:** Includes information on the origin of the car, the number of cylinders, and other attributes like MPG (miles per gallon).

#### Preprocessing

- **Tool Used:** OpenRefine
- **Steps Involved:**
  - Filtering
  - Normalization

  These steps ensured the data was clean and suitable for clustering and visualization purposes.

### Interactive Features

The visualizations include the following interactive buttons to enhance user experience and data exploration:

1. **Filter Nodes**
   - **Function:** Allows users to filter the visualized nodes based on specific criteria (e.g., origin or cylinder count).
   - **Benefit:** Helps users focus on particular subsets of data.

2. **Separate Nodes**
   - **Function:** Provides the option to visually separate nodes that belong to different clusters.
   - **Benefit:** Makes it easier to distinguish between different clusters and understand their distribution.

3. **Adjust Clusters**
   - **Function:** Allows users to modify the clustering parameters or criteria.
   - **Benefit:** Enables dynamic exploration of different clustering results and insights.

4. **Reset Clusters**
   - **Function:** Resets the clustering to its initial state.
   - **Benefit:** Allows users to start over with the original clustering setup, clearing any applied filters or adjustments.

## Clustering Analysis

### Columns Used for Clustering

1. **Origin**
2. **Cylinders**
3. **MPG**

### Clustering Rule

- **Main Clusters:** Based on the origin (US, Europe, Japan).
- **Subclusters:** Based on the number of cylinders within each origin.

### Insights from Clustering

- **Largest Cluster:** To determine the number of cars in the largest cluster, analyze the dataset based on the defined clustering rules.
- **Falsely Clustered Cars:** Identifying falsely clustered cars requires visualization and detailed analysis. Possible reasons include data errors or outliers.

## Documentation and Analysis

### Visualization Design Choices

- **Rationale:** Selected the car dataset due to its richness and relevance for clustering based on origin and cylinder count.
- **Preprocessing:** Ensured accuracy and consistency of the data through cleaning.

### Insights Provided

- **Cluster Analysis:** Visualizations reveal the distribution of cars based on origin and the number of cylinders.

## Installation and Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/car-clustering-visualization.git
    cd car-clustering-visualization
    ```

2. **Open the project:**

    - Open the `index.html` file in your web browser to view the visualizations.


## Output 
![image](https://github.com/user-attachments/assets/d1ede457-2275-40fd-9328-5df41672727a)

Reset Cluster 
![image](https://github.com/user-attachments/assets/149dac3a-2516-4244-b7e9-65e39311752b)

Filter Nodes
![image](https://github.com/user-attachments/assets/4e7a2332-808e-4db2-a792-ffef00890cd4)



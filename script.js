document.addEventListener('DOMContentLoaded', function() {
    const width = 1000, height = 1000;

    // Define centers for the origin-based clustering
    const centers = {
        "US": { x: width / 3, y: height / 2 },  // Center for US origin
        "Europe": { x: width / 2, y: height / 2 },  // Center for Europe origin
        "Japan": { x: 2 * width / 3, y: height / 2 },  // Center for Japan origin
        "Four Cylinders": { x: width / 4, y: height / 4 },  // Center for Four Cylinders
        "Six Cylinders": { x: width / 2, y: height / 4 },  // Center for Six Cylinders
        "Eight Cylinders": { x: 3 * width / 4, y: height / 4 }  // Center for Eight Cylinders
    };

    // Load data from CSV
    d3.csv("cars_dataset.csv").then(function(data) {
        let nodes = data.map((d, i) => ({
            id: i,
            model: d.Model,
            mpg: +d.MPG,
            year: +d.Year,
            origin: d.Origin,
            cylinders: d.Cylinders,
            displacement: d.Displacement,	
            horsepower: d.Horsepower,	
            weight: d.Weight,	
            acceleration: d.Acceleration
        }));

        // Create centers for each cylinder group within each origin
        const cylinderCenters = {};
        data.forEach(d => {
            if (!cylinderCenters[d.Origin]) {
                cylinderCenters[d.Origin] = {};
            }
            if (!cylinderCenters[d.Origin][d.Cylinders]) {
                cylinderCenters[d.Origin][d.Cylinders] = { x: Math.random() * width, y: Math.random() * height };
            }
        });

        let svg = d3.select("#graph").append("svg")
            .attr("width", width)
            .attr("height", height);

        let simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-50))
            .force("collide", d3.forceCollide().radius(10))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("group", alpha => {
                nodes.forEach(d => {
                    const center = centers[d.origin];
                    if (center) {
                        d.vx -= (d.x - center.x) * alpha * 0.1;
                        d.vy -= (d.y - center.y) * alpha * 0.1;
                    }

                    const cylinderCenter = cylinderCenters[d.origin][d.cylinders];
                    if (cylinderCenter) {
                        d.vx -= (d.x - cylinderCenter.x) * alpha * 0.1;
                        d.vy -= (d.y - cylinderCenter.y) * alpha * 0.1;
                    }
                });
            });

        let node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("r", d => calculateRadius(d.mpg))  // Set radius based on MPG
            .attr("fill", d => getColor(d.origin))  // Set fill color based on origin
            .on("mouseover", (event, d) => showDetails(event, d))  // Show details on mouseover
            .on("mouseout", hideDetails)  // Hide details on mouseout
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Function to calculate radius based on MPG
        function calculateRadius(mpg) {
            // Define the range of radius based on MPG values
            // You can adjust the range values according to your data
            const minRadius = 3;
            const maxRadius = 10;
            // Scale the MPG value to the range of radius
            const radiusScale = d3.scaleLinear()
                .domain([0, 50]) // Assuming the maximum MPG is 50
                .range([minRadius, maxRadius]);
            // Return the scaled radius based on the MPG value
            return radiusScale(mpg);
        }

        // Update the position of cluster names
        simulation.on("tick", () => {
            node.attr("cx", d => d.x)
                .attr("cy", d => d.y);
             // Update the position of cluster names
            Object.entries(centers).forEach(([cluster, position]) => {
                svg.select(`#${cluster}-label`)
                    .attr("x", position.x)
                    .attr("y", position.y - 20); // Adjust the position above the cluster
            });
        });

        // Define color based on origin
        function getColor(origin) {
            if (origin === "US") return "red";
            if (origin === "Europe") return "green";
            if (origin === "Japan") return "blue";
            return "gray"; // Fallback color
        }

        // Drag functions
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Show details on mouseover
        function showDetails(event, d) {
            const tooltip = d3.select("#tooltip");
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html(`<strong>Model:</strong> ${d.model}<br>
                          <strong>MPG:</strong> ${d.mpg}<br>
                          <strong>Year:</strong> ${d.year}<br>
                          <strong>Origin:</strong> ${d.origin}<br>
                          <strong>Cylinders:</strong> ${d.cylinders}<br>
                          <strong>Displacement:</strong> ${d.displacement}<br>
                          <strong>Weight:</strong> ${d.weight}<br>
                          <strong>Acceleration:</strong> ${d.acceleration}<br>`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        }

        // Hide details on mouseout
        function hideDetails() {
            d3.select("#tooltip").transition()
                .duration(500)
                .style("opacity", 0);
        }

        // Filtering Nodes
        document.getElementById('filterBtn').addEventListener('click', () => {
            node.style("opacity", d => d.origin === "Japan" ? 1 : 0.1);
            document.querySelector('.header').innerText = 'Cluster of cars based on Origin - Japan ';
        });

        // Separate Nodes
        document.getElementById('separateBtn').addEventListener('click', () => {
            node.style("opacity", 1); // Reset opacity
            simulation.force("x", d3.forceX().x(d => {
                return d.origin === "Japan" ? width * 0.75 : width * 0.25;
            }));
            simulation.alpha(1).restart();
            document.querySelector('.header').innerText = 'Cluster of cars based on Origin and No. of Cylinders';
        });

        // Adjust Clusters
        document.getElementById('adjustClustersBtn').addEventListener('click', () => {
            simulation.force("group", alpha => {
                nodes.forEach(d => {
                    const center = centers[d.origin];
                    if (center) {
                        d.vx -= (d.x - center.x) * alpha * 0.1;
                        d.vy -= (d.y - center.y) * alpha * 0.1;
                    }

                    const cylinderCenter = cylinderCenters[d.origin][d.cylinders];
                    if (cylinderCenter) {
                        d.vx -= (d.x - cylinderCenter.x) * alpha * 0.1;
                        d.vy -= (d.y - cylinderCenter.y) * alpha * 0.1;
                    }
                });
            });
            simulation.alpha(1).restart();
            document.querySelector('.header').innerText = 'Cluster of cars based on Origin and No. of Cylinders';
        });
        
        // Reset Clusters
        document.getElementById('resetClustersBtn').addEventListener('click', () => {
            simulation.force("group", alpha => {
                nodes.forEach(d => {
                    const center = centers[d.origin];
                    if (center) {
                        d.vx -= (d.x - center.x) * alpha * 0.1;
                        d.vy -= (d.y - center.y) * alpha * 0.1;
                    }
                    const cylindersCenter = centers[`${d.cylinders} Cylinders`];
                    if (cylindersCenter) {
                        d.vx -= (d.x - cylindersCenter.x) * alpha * 0.1;
                        d.vy -= (d.y - cylindersCenter.y) * alpha * 0.1;
                    }
                });
            });
            simulation.alpha(1).restart();
            document.querySelector('.header').innerText = 'Cluster of cars based on Origin USA, Europe and Japan';
        });
    });
});
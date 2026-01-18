"use client";

import { useEffect, useState } from 'react';

export default function DistributedSystemAnimation() {
    // Generate particles for animation
    const [packets, setPackets] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPackets(prev => [...prev, Date.now()].slice(-20)); // Keep max 20 packets
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="distributed-system-container">
            <style jsx>{`
                .distributed-system-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    background: rgba(10, 25, 47, 0.4);
                    border-radius: 12px;
                    border: 1px solid rgba(0, 243, 255, 0.1);
                    overflow: hidden;
                }

                /* Common Node Styles */
                .node-container {
                    position: absolute;
                    transform: translate(-50%, -50%); /* Centers the element on the coordinate */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                }

                .node {
                    width: 40px;
                    height: 40px;
                    background: rgba(10, 25, 47, 0.9);
                    border: 1px solid var(--color-blue-neon, #00f3ff);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 15px rgba(0, 243, 255, 0.15);
                    font-size: 10px;
                    font-weight: bold;
                    color: var(--color-blue-neon, #00f3ff);
                    transition: all 0.3s ease;
                }

                .node:hover {
                    box-shadow: 0 0 25px rgba(0, 243, 255, 0.4);
                    transform: scale(1.1);
                }

                .node-label {
                    position: absolute;
                    bottom: -20px;
                    font-size: 10px;
                    color: rgba(255, 255, 255, 0.7);
                    white-space: nowrap;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.8);
                }

                /* Special Node Types */
                .kafka-cluster {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 8px;
                    transform: rotate(45deg);
                    background: transparent;
                    padding: 10px;
                    border: 1px dashed rgba(226, 43, 107, 0.3);
                    border-radius: 50%;
                }
                
                .kafka-node {
                    width: 10px;
                    height: 10px;
                    background: #E22B6B;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #E22B6B;
                    animation: pulse-kafka 2s infinite;
                }

                .node-ai {
                    border-color: var(--color-saffron, #F38C32);
                    color: var(--color-saffron, #F38C32);
                    box-shadow: 0 0 15px rgba(243, 140, 50, 0.3);
                    border-radius: 50%;
                    width: 48px;
                    height: 48px;
                }

                .node-spark {
                    border-color: #E65100; /* Spark Orange */
                    color: #FF6D00;
                    box-shadow: 0 0 15px rgba(255, 109, 0, 0.3);
                }

                .node-db {
                    border-color: #00E676; /* Lakehouse Green */
                    color: #00E676;
                    border-radius: 4px; /* Cylinder-ish via generic box for now */
                    box-shadow: 0 0 15px rgba(0, 230, 118, 0.3);
                    height: 45px;
                }

                .node-user {
                    border-color: #2979FF;
                    color: #2979FF;
                }

                /* Connections */
                .connections {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }

                .connection-line {
                    stroke: rgba(255, 255, 255, 0.1);
                    stroke-width: 1.5;
                    stroke-dasharray: 5;
                    animation: dash-flow 30s linear infinite;
                }

                .connection-active {
                    stroke: rgba(0, 243, 255, 0.3);
                    stroke-width: 2;
                }

                @keyframes dash-flow {
                    to {
                        stroke-dashoffset: -100;
                    }
                }

                /* Particles */
                .packet {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--color-blue-neon, #00f3ff);
                    box-shadow: 0 0 8px var(--color-blue-neon, #00f3ff);
                    z-index: 3;
                    opacity: 0;
                    transform: translate(-50%, -50%); /* Center packet on path */
                }

                .packet-ai {
                    background: var(--color-saffron, #F38C32);
                    box-shadow: 0 0 8px var(--color-saffron, #F38C32);
                }

                .packet-data {
                    background: #00E676;
                    box-shadow: 0 0 8px #00E676;
                }

                /* Animations computed to match coordinates */
                /* Coordinates:
                   API: 10%, 50%
                   Kafka: 45%, 50%
                   AI: 65%, 20%
                   Spark: 65%, 80%
                   Lakehouse: 85%, 80%
                   User: 85%, 50%
                */

                /* API (10,50) -> Kafka (45,50) */
                @keyframes flow-api-kafka {
                    0% { left: 10%; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    10% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    90% { left: 45%; top: 50%; opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { left: 45%; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                }

                /* Kafka (45,50) -> AI (65,20) */
                @keyframes flow-kafka-ai {
                    0% { left: 45%; top: 50%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { left: 65%; top: 20%; opacity: 1; }
                    100% { left: 65%; top: 20%; opacity: 0; }
                }

                /* AI (65,20) -> Kafka (45,50) */
                @keyframes flow-ai-kafka {
                    0% { left: 65%; top: 20%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { left: 45%; top: 50%; opacity: 1; }
                    100% { left: 45%; top: 50%; opacity: 0; }
                }

                /* Kafka (45,50) -> Spark (65,80) */
                @keyframes flow-kafka-spark {
                    0% { left: 45%; top: 50%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { left: 65%; top: 80%; opacity: 1; }
                    100% { left: 65%; top: 80%; opacity: 0; }
                }

                /* Spark (65,80) -> Lakehouse (85,80) */
                @keyframes flow-spark-lake {
                    0% { left: 65%; top: 80%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { left: 85%; top: 80%; opacity: 1; }
                    100% { left: 85%; top: 80%; opacity: 0; }
                }

                /* Kafka (45,50) -> User (85,50) */
                @keyframes flow-kafka-user {
                    0% { left: 45%; top: 50%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { left: 85%; top: 50%; opacity: 1; }
                    100% { left: 85%; top: 50%; opacity: 0; }
                }

                @keyframes pulse-kafka {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
            `}</style>

            {/* Legend / Title overlay? Maybe too cluttered. Keeping it clean. */}

            <svg className="connections">
                {/* API -> Kafka */}
                <line x1="10%" y1="50%" x2="45%" y2="50%" className="connection-line connection-active" />

                {/* Kafka -> AI Loop */}
                <line x1="45%" y1="50%" x2="65%" y2="20%" className="connection-line" />
                <line x1="65%" y1="20%" x2="45%" y2="50%" className="connection-line" style={{ opacity: 0.3 }} />

                {/* Kafka -> Spark -> Lakehouse */}
                <line x1="45%" y1="50%" x2="65%" y2="80%" className="connection-line connection-active" />
                <line x1="65%" y1="80%" x2="85%" y2="80%" className="connection-line" />

                {/* Kafka -> User */}
                <line x1="45%" y1="50%" x2="85%" y2="50%" className="connection-line connection-active" />
            </svg>

            {/* API Node */}
            <div className="node-container" style={{ left: '10%', top: '50%' }}>
                <div className="node">API</div>
            </div>

            {/* Kafka Cluster */}
            <div className="node-container" style={{ left: '45%', top: '50%' }}>
                <div className="kafka-cluster">
                    <div className="kafka-node" style={{ animationDelay: '0s' }}></div>
                    <div className="kafka-node" style={{ animationDelay: '0.5s' }}></div>
                    <div className="kafka-node" style={{ animationDelay: '0.2s' }}></div>
                    <div className="kafka-node" style={{ animationDelay: '0.7s' }}></div>
                </div>
                <div className="node-label" style={{ bottom: '-35px' }}>Kafka Mesh</div>
            </div>

            {/* AI Node */}
            <div className="node-container" style={{ left: '65%', top: '20%' }}>
                <div className="node node-ai">AI</div>
                <div className="node-label">LLM Inference</div>
            </div>

            {/* Spark Node */}
            <div className="node-container" style={{ left: '65%', top: '80%' }}>
                <div className="node node-spark">Spk</div>
                <div className="node-label">Spark Streaming</div>
            </div>

            {/* Lakehouse Node */}
            <div className="node-container" style={{ left: '85%', top: '80%' }}>
                <div className="node node-db">DB</div>
                <div className="node-label">Lakehouse</div>
            </div>

            {/* User Node */}
            <div className="node-container" style={{ left: '85%', top: '50%' }}>
                <div className="node node-user">User</div>
            </div>

            {/* Packets */}
            {packets.map((id, index) => (
                <div key={id}>
                    {/* 1. Ingest: API -> Kafka */}
                    <div
                        className="packet"
                        style={{
                            animation: `flow-api-kafka 1.5s linear forwards`,
                            animationDelay: `${index * 0.3}s`
                        }}
                    />

                    {/* 2. AI Processing: Kafka -> AI -> Kafka */}
                    {index % 3 === 0 && (
                        <>
                            <div
                                className="packet packet-ai"
                                style={{
                                    animation: `flow-kafka-ai 1s linear forwards`,
                                    animationDelay: `${index * 0.3 + 1.4}s`
                                }}
                            />
                            <div
                                className="packet packet-ai"
                                style={{
                                    animation: `flow-ai-kafka 1s linear forwards`,
                                    animationDelay: `${index * 0.3 + 2.4}s`
                                }}
                            />
                        </>
                    )}

                    {/* 3. Data Analytics: Kafka -> Spark -> Lakehouse */}
                    {index % 2 === 0 && (
                        <>
                            <div
                                className="packet packet-data"
                                style={{
                                    animation: `flow-kafka-spark 1s linear forwards`,
                                    animationDelay: `${index * 0.3 + 1.5}s`
                                }}
                            />
                            <div
                                className="packet packet-data"
                                style={{
                                    animation: `flow-spark-lake 1s linear forwards`,
                                    animationDelay: `${index * 0.3 + 2.5}s`
                                }}
                            />
                        </>
                    )}

                    {/* 4. Real-time Output: Kafka -> User */}
                    <div
                        className="packet"
                        style={{
                            animation: `flow-kafka-user 1.5s linear forwards`,
                            animationDelay: `${index * 0.3 + 1.6}s`
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

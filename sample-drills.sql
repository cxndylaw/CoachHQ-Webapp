-- Sample Drills for coachHQ
-- Replace YOUR_COACH_UUID with your actual coach ID from auth.users
-- Get it with: SELECT id FROM auth.users LIMIT 1;

-- Technical Skills
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Forehand Drive', 'Technical Skills - Forehand', 3, 'Master the fundamental forehand stroke with proper grip and swing mechanics', 30, ARRAY['Grip', 'Stance', 'Backswing', 'Contact point', 'Follow-through']),
('YOUR_COACH_UUID', 'Backhand Technique', 'Technical Skills - Backhand', 3, 'Develop a solid backhand stroke both clear and drop varieties', 30, ARRAY['Backhand grip', 'Two-handed option', 'Consistency', 'Depth control']),
('YOUR_COACH_UUID', 'Serve Practice', 'Technical Skills - Serve', 4, 'Perfect your serve with focus on placement and power variations', 30, ARRAY['High serve', 'Low serve', 'Flick serve', 'Consistency', 'Placement']),
('YOUR_COACH_UUID', 'Return of Serve Drills', 'Technical Skills - Return of Serve', 3, 'Improve response and positioning against opponent serves', 25, ARRAY['Early positioning', 'Anticipation', 'Return options', 'Consistency']),
('YOUR_COACH_UUID', 'Net Play Fundamentals', 'Technical Skills - Net Play', 3, 'Develop close-range net game skills including drops and pushes', 25, ARRAY['Net positioning', 'Touch', 'Reaction', 'Drop precision']),
('YOUR_COACH_UUID', 'Lift and Clear Technique', 'Technical Skills - Lift/Clear', 3, 'Master defensive clears and attacking lifts to regain court position', 25, ARRAY['Timing', 'Power', 'Angle', 'Recovery']),
('YOUR_COACH_UUID', 'Drop Shot Practice', 'Technical Skills - Drop Shot', 4, 'Execute precise drop shots to tire opponent and control points', 30, ARRAY['Deception', 'Softness', 'Placement', 'Angle variation']),
('YOUR_COACH_UUID', 'Smash Execution', 'Technical Skills - Smash', 4, 'Perfect the attacking smash stroke for finishing opportunities', 30, ARRAY['Power', 'Positioning', 'Timing', 'Accuracy', 'Angles']),
('YOUR_COACH_UUID', 'Drive Rally Drills', 'Technical Skills - Drive', 3, 'Build consistency in fast-paced baseline drives', 25, ARRAY['Pace control', 'Consistency', 'Timing', 'Court position']),
('YOUR_COACH_UUID', 'Push Shot Perfection', 'Technical Skills - Push', 3, 'Refine short-range pushes and flicks from net position', 20, ARRAY['Touch', 'Accuracy', 'Variety', 'Deception']),
('YOUR_COACH_UUID', 'Flick Service Drill', 'Technical Skills - Flick', 3, 'Master the flick shot to counter rushing opponents at net', 20, ARRAY['Timing', 'Precision', 'Deception']),
('YOUR_COACH_UUID', 'Slice and Deception', 'Technical Skills - Slice/Deception', 4, 'Learn slice shots and deceptive strokes to confuse opponents', 30, ARRAY['Slice grip', 'Deception', 'Feel', 'Control']);

-- Footwork & Movement
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Basic Footwork Patterns', 'Footwork & Movement - Basic Footwork', 2, 'Learn and practice fundamental footwork patterns', 20, ARRAY['Step efficiency', 'Balance', 'Rhythm', 'Court positioning']),
('YOUR_COACH_UUID', 'Shadow Footwork', 'Footwork & Movement - Shadow Footwork', 2, 'Execute footwork patterns without hitting shuttles', 15, ARRAY['Movement speed', 'Smooth transitions', 'Body control']),
('YOUR_COACH_UUID', 'Six-Corner Movement Drill', 'Footwork & Movement - Six-Corner Movement', 4, 'Move quickly between all court areas covering defensive positions', 30, ARRAY['Speed', 'Agility', 'Endurance', 'Court awareness']),
('YOUR_COACH_UUID', 'Recovery Footwork', 'Footwork & Movement - Recovery', 3, 'Improve ability to recover to neutral position after attacking shots', 25, ARRAY['Quick recovery', 'Anticipation', 'Positioning', 'Energy efficiency']),
('YOUR_COACH_UUID', 'Split Step Practice', 'Footwork & Movement - Split Step', 2, 'Master the split step for explosive first movements', 15, ARRAY['Timing', 'Weight transfer', 'Explosiveness']),
('YOUR_COACH_UUID', 'Balance and Stability', 'Footwork & Movement - Balance', 2, 'Develop body balance during movement and shots', 20, ARRAY['Core stability', 'Weight management', 'Shot accuracy']),
('YOUR_COACH_UUID', 'Agility Ladder Training', 'Footwork & Movement - Agility', 3, 'Improve lateral movement speed and coordination', 20, ARRAY['Side-to-side speed', 'Coordination', 'Foot placement']),
('YOUR_COACH_UUID', 'Court Coverage Fundamentals', 'Footwork & Movement - Court Coverage', 3, 'Learn optimal positioning to cover maximum court area', 25, ARRAY['Positioning', 'Anticipation', 'Movement efficiency']);

-- Tactical Skills
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Singles Tactics Training', 'Tactical Skills - Singles Tactics', 4, 'Develop strategic approaches for singles match play', 40, ARRAY['Court positioning', 'Shot selection', 'Opponent analysis', 'Pattern recognition']),
('YOUR_COACH_UUID', 'Doubles Tactics Session', 'Tactical Skills - Doubles Tactics', 4, 'Learn positioning and communication strategies for doubles', 40, ARRAY['Partner coordination', 'Net control', 'Coverage', 'Communication']),
('YOUR_COACH_UUID', 'Shot Selection Drills', 'Tactical Skills - Shot Selection', 3, 'Practice choosing the best shot in different court situations', 30, ARRAY['Court position awareness', 'Opponent positioning', 'Risk assessment']),
('YOUR_COACH_UUID', 'Rally Construction', 'Tactical Skills - Rally Construction', 3, 'Build points systematically rather than hitting winners', 30, ARRAY['Point building', 'Patience', 'Consistency', 'Pressure application']),
('YOUR_COACH_UUID', 'Positioning Mastery', 'Tactical Skills - Positioning', 3, 'Perfect your court positioning in different game situations', 25, ARRAY['Offensive positioning', 'Defensive stance', 'Anticipation']),
('YOUR_COACH_UUID', 'Rotation and Court Movement', 'Tactical Skills - Rotation', 3, 'Learn proper rotation strategies in doubles play', 30, ARRAY['Partner rotation', 'Communication', 'Timing']),
('YOUR_COACH_UUID', 'Attack to Defence Transition', 'Tactical Skills - Attack to Defence', 3, 'Smoothly transition from attacking to defensive positions', 25, ARRAY['Shot recognition', 'Quick footwork', 'Recovery speed']),
('YOUR_COACH_UUID', 'Defence to Attack Strategy', 'Tactical Skills - Defence to Attack', 3, 'Convert defensive situations into attacking opportunities', 25, ARRAY['Opportunistic attacking', 'Positioning', 'Shot timing']);

-- Defensive Skills
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Smash Defence Techniques', 'Defensive Skills - Smash Defence', 4, 'Learn to defend against powerful smash attacks', 30, ARRAY['Positioning', 'Quick reaction', 'Recovery shots', 'Court coverage']),
('YOUR_COACH_UUID', 'Block Defence Drill', 'Defensive Skills - Block Defence', 3, 'Practice blocking fast shots at net and baseline', 25, ARRAY['Reaction speed', 'Touch control', 'Positioning']),
('YOUR_COACH_UUID', 'Counter Attack Training', 'Defensive Skills - Counter Attack', 4, 'Turn defence into attack opportunities', 30, ARRAY['Timing', 'Explosive movement', 'Shot selection']),
('YOUR_COACH_UUID', 'Retrieval Practice', 'Defensive Skills - Retrieval', 3, 'Develop ability to retrieve difficult shots', 25, ARRAY['Agility', 'Reach', 'Shot options', 'Recovery']),
('YOUR_COACH_UUID', 'Defensive Footwork', 'Defensive Skills - Defensive Footwork', 3, 'Master footwork patterns for defensive positions', 25, ARRAY['Quick lateral movement', 'Backpedaling', 'Forward movement']);

-- Attacking Skills
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Offensive Pressure Building', 'Attacking Skills - Offensive Pressure', 4, 'Build sustained offensive pressure throughout points', 35, ARRAY['Aggressive shot placement', 'Consistent attacking', 'Opponent pressure']),
('YOUR_COACH_UUID', 'Jump Smash Technique', 'Attacking Skills - Jump Smash', 4, 'Perfect the explosive jump smash for maximum power', 30, ARRAY['Timing', 'Power generation', 'Accuracy', 'Height']),
('YOUR_COACH_UUID', 'Follow-up Attack Drill', 'Attacking Skills - Follow-up Attack', 3, 'Practice attacking sequences and follow-up shots', 30, ARRAY['Shot combination', 'Court position', 'Tempo']),
('YOUR_COACH_UUID', 'Front Court Kill', 'Attacking Skills - Front Court Kill', 3, 'Execute finishing shots at the net', 25, ARRAY['Precision', 'Touch', 'Timing', 'Angles']),
('YOUR_COACH_UUID', 'Rear Court Attack Strategy', 'Attacking Skills - Rear Court Attack', 3, 'Develop attacking options from baseline', 30, ARRAY['Power shots', 'Angle variation', 'Court position']),
('YOUR_COACH_UUID', 'Continuous Attack Drills', 'Attacking Skills - Continuous Attack', 4, 'Maintain attacking pressure throughout rallies', 35, ARRAY['Aggression', 'Consistency', 'Shot variety', 'Patience']);

-- Physical Conditioning
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Speed and Acceleration Training', 'Physical Conditioning - Speed', 3, 'Build explosive speed for court movement', 25, ARRAY['First step speed', 'Acceleration', 'Max velocity']),
('YOUR_COACH_UUID', 'Agility Cone Drills', 'Physical Conditioning - Agility', 3, 'Improve lateral agility with cone drills', 20, ARRAY['Direction change', 'Balance', 'Coordination']),
('YOUR_COACH_UUID', 'Endurance and Stamina Building', 'Physical Conditioning - Endurance/Stamina', 4, 'Build aerobic and anaerobic fitness for long matches', 40, ARRAY['Aerobic capacity', 'Match simulation', 'Recovery']),
('YOUR_COACH_UUID', 'Strength Development', 'Physical Conditioning - Strength', 3, 'Build sport-specific strength for powerful shots', 30, ARRAY['Power generation', 'Explosive strength', 'Core strength']),
('YOUR_COACH_UUID', 'Power Generation Drills', 'Physical Conditioning - Power', 3, 'Develop maximum power in shots', 25, ARRAY['Leg drive', 'Rotation', 'Arm speed']),
('YOUR_COACH_UUID', 'Explosive Movement Training', 'Physical Conditioning - Explosiveness', 3, 'Build explosive power for quick movements', 20, ARRAY['Plyometrics', 'Rapid acceleration', 'Deceleration']),
('YOUR_COACH_UUID', 'Coordination Development', 'Physical Conditioning - Coordination', 2, 'Improve hand-eye and body coordination', 20, ARRAY['Timing', 'Balance', 'Complex movements']),
('YOUR_COACH_UUID', 'Flexibility and Mobility', 'Physical Conditioning - Flexibility', 2, 'Maintain and improve range of motion', 20, ARRAY['Stretching', 'Joint mobility', 'Injury prevention']);

-- Reaction & Reflexes
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Reaction Time Drills', 'Reaction & Reflexes - Reaction Time', 3, 'Improve response time to opponent shots', 20, ARRAY['Visual tracking', 'Quick decision', 'Explosive response']),
('YOUR_COACH_UUID', 'Reflex Training Games', 'Reaction & Reflexes - Reflex Training', 3, 'Build instinctive reactions through games', 25, ARRAY['Instinctive movement', 'Quick decisions', 'Minimal thinking']),
('YOUR_COACH_UUID', 'Hand-Eye Coordination Drills', 'Reaction & Reflexes - Hand-Eye Coordination', 2, 'Perfect timing between vision and shot execution', 20, ARRAY['Contact timing', 'Visual focus', 'Accuracy']),
('YOUR_COACH_UUID', 'Decision Making Under Pressure', 'Reaction & Reflexes - Decision Making', 3, 'Practice making quick tactical decisions', 25, ARRAY['Shot selection', 'Speed of decision', 'Pressure situations']);

-- Multi-Shuttle & Feeding
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Multi-Shuttle Drill', 'Multi-Shuttle & Feeding - Multi-Shuttle', 4, 'Practice with rapid shuttle feeding for consistency', 30, ARRAY['Consistency', 'Rapid repetition', 'Muscle memory']),
('YOUR_COACH_UUID', 'Coach Feeding Drill', 'Multi-Shuttle & Feeding - Coach Feeding', 3, 'Develop consistency with coach-fed shuttles', 25, ARRAY['Control', 'Technique', 'Tempo']),
('YOUR_COACH_UUID', 'Continuous Feeding Drill', 'Multi-Shuttle & Feeding - Continuous Feeding', 4, 'Practice with continuous shuttle feeding', 35, ARRAY['Endurance', 'Consistency', 'Rally simulation']),
('YOUR_COACH_UUID', 'Random Feeding Session', 'Multi-Shuttle & Feeding - Random Feeding', 4, 'React to randomly fed shuttles for adaptability', 30, ARRAY['Adaptability', 'Quick reactions', 'Decision making']);

-- Match Play
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Conditioned Games', 'Match Play - Conditioned Games', 4, 'Play with specific rules to focus on specific skills', 35, ARRAY['Skill focus', 'Game application', 'Rule variation']),
('YOUR_COACH_UUID', 'Match Simulation', 'Match Play - Match Simulation', 4, 'Practice realistic match scenarios', 40, ARRAY['Pressure management', 'Strategy application', 'Stamina']),
('YOUR_COACH_UUID', 'Practice Matches', 'Match Play - Practice Matches', 4, 'Full competitive practice matches', 45, ARRAY['Competition', 'Complete game', 'Match fitness']),
('YOUR_COACH_UUID', 'Challenge Games', 'Match Play - Challenge Games', 4, 'Competitive challenges against other players', 40, ARRAY['Competitiveness', 'Strategy', 'Performance']),
('YOUR_COACH_UUID', 'King of the Court Tournament', 'Match Play - King of the Court', 4, 'Rotating tournament format for multiple players', 50, ARRAY['Stamina', 'Competitive spirit', 'Consistency']);

-- Warm-up & Recovery
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Dynamic Warm-up Session', 'Warm-up & Recovery - Warm-up', 1, 'Pre-session warm-up routine to prepare for practice', 15, ARRAY['Joint mobility', 'Heart rate elevation', 'Mental preparation']),
('YOUR_COACH_UUID', 'Dynamic Stretching Routine', 'Warm-up & Recovery - Dynamic Stretching', 1, 'Movement-based stretching for preparation', 10, ARRAY['Mobility', 'Range of motion', 'Muscle activation']),
('YOUR_COACH_UUID', 'Mobility Training', 'Warm-up & Recovery - Mobility', 2, 'Improve joint mobility and movement quality', 20, ARRAY['Joint health', 'Movement quality', 'Injury prevention']),
('YOUR_COACH_UUID', 'Cool-Down Session', 'Warm-up & Recovery - Cool-down', 1, 'Post-session cool-down and transition routine', 15, ARRAY['Heart rate recovery', 'Mental relaxation', 'Transition']),
('YOUR_COACH_UUID', 'Recovery and Stretching', 'Warm-up & Recovery - Recovery', 2, 'Post-session recovery and static stretching', 20, ARRAY['Muscle recovery', 'Flexibility', 'Injury prevention']);

-- Mental Skills
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Focus and Concentration Drill', 'Mental Skills - Focus', 3, 'Build mental focus and concentration for matches', 25, ARRAY['Attention', 'Distraction management', 'Mental toughness']),
('YOUR_COACH_UUID', 'Communication Drills', 'Mental Skills - Communication', 2, 'Improve communication with partner in doubles', 20, ARRAY['Clear communication', 'Positive feedback', 'Call making']),
('YOUR_COACH_UUID', 'Confidence Building', 'Mental Skills - Confidence', 3, 'Develop confidence through successful shots', 25, ARRAY['Positive mindset', 'Self-belief', 'Achievement']),
('YOUR_COACH_UUID', 'Pressure Situation Practice', 'Mental Skills - Pressure Situations', 4, 'Practice decision-making under pressure', 30, ARRAY['Composure', 'Execution', 'Mental resilience']),
('YOUR_COACH_UUID', 'Game Awareness Training', 'Mental Skills - Game Awareness', 3, 'Develop understanding of game state and strategy', 25, ARRAY['Score awareness', 'Tactical awareness', 'Situation assessment']);

-- Beginner Skills
INSERT INTO drills (coach_id, name, category, difficulty, description, duration_mins, focus_points) VALUES
('YOUR_COACH_UUID', 'Grip Fundamentals', 'Beginner Skills - Grip', 1, 'Learn proper badminton grips for different shots', 20, ARRAY['Forehand grip', 'Backhand grip', 'Net shot grip', 'Service grip']),
('YOUR_COACH_UUID', 'Ready Position Basics', 'Beginner Skills - Ready Position', 1, 'Master the fundamental ready position', 15, ARRAY['Stance', 'Balance', 'Racket position']),
('YOUR_COACH_UUID', 'Basic Swing Mechanics', 'Beginner Skills - Basic Swing', 2, 'Learn fundamental swing mechanics', 25, ARRAY['Backswing', 'Foreswing', 'Follow-through', 'Timing']),
('YOUR_COACH_UUID', 'Basic Rules and Court Understanding', 'Beginner Skills - Basic Rules', 1, 'Learn badminton rules and court layout', 20, ARRAY['Scoring', 'Faults', 'Court boundaries', 'Service rules']),
('YOUR_COACH_UUID', 'Court Awareness for Beginners', 'Beginner Skills - Court Awareness', 1, 'Develop awareness of court positioning and movement', 20, ARRAY['Court layout', 'Movement patterns', 'Positioning basics']);

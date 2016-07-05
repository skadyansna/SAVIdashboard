
source /Users/kadyan/savi_config
ResourceId=$1
        echo $ResourceId
        ceilometer sample-list -m cpu -q resource_id=$ResourceId | awk 'NR==4{print $8$10}' 
        ceilometer sample-list -m cpu_util -q resource_id=$ResourceId | awk 'NR==4{print $8$10}' 
        ceilometer sample-list -m disk.ephemeral.size -q resource_id=$ResourceId | awk 'NR==4{print $8$10}'
        ceilometer sample-list -m disk.read.bytes -q resource_id=$ResourceId | awk 'NR==4{print $8$10}' 
        ceilometer sample-list -m disk.root.size -q resource_id=$ResourceId | awk 'NR==4{print $8$10}' 
        ceilometer sample-list -m disk.write.bytes -q resource_id=$ResourceId | awk 'NR==4{print $8$10}'
        ceilometer sample-list -m disk.write.requests -q resource_id=$ResourceId |  awk 'NR==4{print $8$10}' 
        ceilometer sample-list -m instance -q resource_id=$ResourceId | awk 'NR==4{print $8$10}' 
        ceilometer sample-list -m memory  -q resource_id=$ResourceId | awk 'NR==4{print $8$10}' 
        ceilometer sample-list -m vcpus  -q resource_id=$ResourceId | awk 'NR==4{print $8$10}'
        ceilometer sample-list -m network.incoming.bytes -q resource_id=$ResourceId | awk 'NR==4{print $8$10}'
        ceilometer sample-list -m network.outgoing.bytes -q resource_id=$ResourceId | awk 'NR==4{print $8$10}'
